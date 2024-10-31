
Local Setup:
============

1.  **Install Required Tools**: If not already installed, ensure the following tools are available:
    
    *   **Docker for Mac** (includes Kubernetes support)
    *   **Terraform** (`brew install terraform` if using macOS)
    *   **Tilt** (`brew install tilt` if using macOS)
2.  **Enable Kubernetes**: Make sure Docker for Mac is running a Kubernetes cluster. (Search for "run Kubernetes with Docker for Mac" if new to Kubernetes.)
    
3.  **Initialize Terraform**: Open this repository in your preferred code editor and terminal (assuming the current directory is the root of this repo):
    
    *   Run `terraform init` (only required on the first run, but can be re-run if needed).
4.  **Set Up Persistent Volumes**:
    
    *   Go to the `db` module, update the paths for persistent volumes, and create the necessary folders (Terraform cannot create folders by itself).
5.  **Install Helm**:
    
    *   Run `brew install helm` on macOS to install Helm.
6.  **Add Bitnami Repository**:
    
    *   Add Bitnami (like Docker Hub for Helm) by running:
        
        bash
        
        Copy code
        
        `helm repo add bitnami https://charts.bitnami.com/bitnami`
        
    *   This step is required since Terraform does not handle this automatically.
7.  **Load Development Environment**:
    
    *   Run `bash start.sh` to load the dev environment (debugger and hot reloading are automatic on all services, but the first load may be slow as Docker downloads images).
8.  **Connect to MongoDB Instances**:
    
    *   Connect to any of the MongoDB instances using a MongoDB client (like Studio 3T). The connection string format will be:
        
        plaintext
        
        Copy code
        
        `mongodb://localhost:<port>`
        
    *   The exact port numbers are found in the `start.sh` file.

* * *

### MongoDB Connections for Studio 3T

To connect to each service’s MongoDB instance, copy the following connection strings and import them into the Studio 3T "connect" panel using the "from clipboard" option:

*   **Calls Service**
    
    ruby
    
    Copy code
    
    `mongodb://localhost:27002/?retryWrites=true&loadBalanced=false&connectTimeoutMS=10000&3t.uriVersion=3&3t.connection.name=calls+service&3t.alwaysShowAuthDB=true&3t.alwaysShowDBFromUserRole=true`
    
*   **Companies Service**
    
    ruby
    
    Copy code
    
    `mongodb://localhost:27001/?retryWrites=true&loadBalanced=false&connectTimeoutMS=10000&3t.uriVersion=3&3t.connection.name=companies+service&3t.alwaysShowAuthDB=true&3t.alwaysShowDBFromUserRole=true`
    
*   **Users Service**
    
    bash
    
    Copy code
    
    `mongodb://localhost:27000/?retryWrites=true&loadBalanced=false&connectTimeoutMS=10000&3t.uriVersion=3&3t.connection.name=users+service&3t.alwaysShowAuthDB=true&3t.alwaysShowDBFromUserRole=true`
    

* * *

### Sync Script for Real-Time Package Updates

A `sync_package.sh` script is provided to streamline development and automatically sync changes from a local package directory to the container.

**Usage**:

bash

Copy code

`./sync_package.sh <absolute_path_to_package> <app_name>`

*   `<absolute_path_to_package>`: The full path to your local package directory.
*   `<app_name>`: The app label used to identify the target container.

**Description**:

*   This script syncs local changes to the container’s `/mnt/package` directory, runs `npm link` and `tsc --watch` on the package directory, and links the package in the application directory (`/app`) using `npm link <package-name>`.
*   **Real-Time Monitoring**: The script uses `fswatch` to monitor changes in the local package and applies them in real-time to the container.

**Important Notes**:

*   **Local Installation**: `fswatch` is required for real-time monitoring. Install it on macOS with:
    
    bash
    
    Copy code
    
    `brew install fswatch`
    
*   **Node Modules Warning**: The script will also copy `node_modules` from the local machine to the container, which may cause inconsistencies if there are platform-specific dependencies or if certain packages are installed differently locally and in the container. Consider modifying the script to exclude `node_modules` if this becomes an issue.

* * *

### Standards

1.  **Document IDs**:
    *   If a service is the primary creator of a resource (e.g., `users` collection in the `signup` service), it should save new records without an ID, allowing the collection to assign a unique string ID.
    *   If the resource is shared via an event, publish the document ID so it can be saved across services with the same ID.
    *   Resource validation should always include an `ID` string property.

