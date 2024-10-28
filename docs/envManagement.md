# Environment Variable Management Overview

## Local Environment with `.env` Files

- **Services running outside any Kubernetes cluster simply use `.env` files for environment variables.**
- **These files are excluded from version control for security.**

## Local Cluster with Tilt

- **Terraform generates YAML files identical to the deployments of the services (in YAML syntax instead of Terraform) so that Tilt can run them.**
  - *We use Tilt for port forwarding and code synchronization from the folder directly into the pod without rebuilding the image. Tilt doesn't work with Terraform resources—only with YAML files.*

- **Each service has a separate JSON file with environment variables, and the entire file is loaded into a Kubernetes Secret resource by the Secrets module (as part of Terraform).**

- **The deployment is responsible for injecting the Kubernetes Secret resource of each service as environment variables into the pod.**
  - For the deployment to know how to do this, it needs to be specified in the deployment description. Therefore, it's written both in the deployment description in Terraform and in the deployment description of the generated YAML files.

## Cloud Run without Tilt and YAML Generation

- **In the cloud environment, services run on a Kubernetes cluster without using Tilt or generated YAML files.**

- **Terraform directly manages the deployments on the remote cluster using its own configuration files.**

- **Each service's environment variables are managed similarly:**
  - The separate JSON files with environment variables are loaded into Kubernetes Secret resources by the Secrets module (as part of Terraform).

- **Deployments use these Secrets by referencing them in their deployment descriptions within the Terraform configuration.**

## Updating Environment Variables

### Update Process

1. **Change the variables in the JSON file.**
2. **Run `terraform apply`.**
3. **The new content is reloaded into the Kubernetes Secrets resource.**
4. **The Terraform module responsible for the environment variables also calculates a checksum (hash) of the file and outputs it.**
5. **The deployment descriptions (both in Terraform and the generated YAML files) specify the checksum value of each deployment.**
6. **When the checksum changes, the deployment description changes (again, both in Terraform and in the YAMLs).**

### Modes of Operation

#### Local Execution with Tilt

- **Tilt detects changes in the folder and rebuilds the image.**
  - The image build is very fast because everything is cached.
- **Tilt reruns the deployment with the updated Secrets resource.**
- **The service runs with updated environment variables.**

#### Cloud Execution without Tilt

- **Terraform detects that the deployment description in its configuration files has changed and updates the deployment running on the remote cluster.**
- **When the deployment receives an update from Terraform, it performs a rolling update and creates pods with environment variables from the updated Secrets resource.**

---

This setup offers a robust and efficient system for managing environment variables across various environments, ensuring quick updates while maintaining security and consistency. It provides a clear separation between local development and cloud deployment, leveraging the strengths of each tool in your stack:

- **`.env` Files** for simplicity in a non-clustered local environment.
- **Tilt** for local orchestration, port forwarding, and live code synchronization without rebuilding images.
- **Terraform** for cloud provisioning and managing deployments directly on the Kubernetes cluster.
