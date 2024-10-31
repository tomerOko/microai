#!/bin/bash

# Usage: ./sync_package.sh /absolute/path/to/package app_name

# Arguments
PACKAGE_PATH="$1"
APP_NAME="$2"

# Verify arguments
if [[ -z "$PACKAGE_PATH" || -z "$APP_NAME" ]]; then
  echo "Usage: $0 <absolute_path_to_package> <app_name>"
  exit 1
fi

# Find the pod name with the given app label
POD_NAME=$(kubectl get pods -l app="$APP_NAME" -o jsonpath="{.items[0].metadata.name}")

if [[ -z "$POD_NAME" ]]; then
  echo "Error: No pod found with app label $APP_NAME"
  exit 1
fi

echo "Found pod: $POD_NAME"

# Function to perform file copy with kubectl cp
sync_to_container() {
  echo "Copying changes from $PACKAGE_PATH to /mnt/package on container..."
  kubectl cp "$PACKAGE_PATH/." "$POD_NAME":/mnt/package
  if [[ $? -ne 0 ]]; then
    echo "Error: kubectl cp failed to sync files."
    exit 1
  fi
  echo "Sync complete."

  # Run npm link and tsc --watch in /mnt/package on the container
  echo "Running npm link and tsc --watch in the package directory..."
  kubectl exec "$POD_NAME" -- sh -c "cd /mnt/package && npm link && tsc --watch" &
  
  # Run npm link in the app directory to link the package
  echo "Linking the package in the application directory..."
  kubectl exec "$POD_NAME" -- sh -c "cd /app && npm link events-tomeroko3"
}

# Initial sync and setup
sync_to_container

# Use fswatch to watch for changes and trigger kubectl cp
echo "Watching for changes in $PACKAGE_PATH..."
fswatch -o "$PACKAGE_PATH" | while read change; do
  sync_to_container
done
