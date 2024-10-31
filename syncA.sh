#!/bin/bash

# Usage: ./sync_package.sh /absolute/path/to/package app_name local_port

# Arguments
PACKAGE_PATH="$1"
APP_NAME="$2"
SSH_PORT="$3"

# Verify arguments
if [[ -z "$PACKAGE_PATH" || -z "$APP_NAME" || -z "$SSH_PORT" ]]; then
  echo "Usage: $0 <absolute_path_to_package> <app_name> <local_port>"
  exit 1
fi

# Find the pod name with the given app label
POD_NAME=$(kubectl get pods -l app="$APP_NAME" -o jsonpath="{.items[0].metadata.name}")

if [[ -z "$POD_NAME" ]]; then
  echo "Error: No pod found with app label $APP_NAME"
  exit 1
fi

echo "Found pod: $POD_NAME"

# Function to perform rsync
sync_to_container() {
  echo "Syncing changes from $PACKAGE_PATH to /mnt/package on container..."
  rsync -avz -e "ssh -o StrictHostKeyChecking=no -p $SSH_PORT" --delete "$PACKAGE_PATH/" "localhost:/mnt/package"
  echo "Sync complete."
}

# Initial sync
sync_to_container

# Use fswatch to watch for changes and trigger rsync
echo "Watching for changes in $PACKAGE_PATH..."
fswatch -o "$PACKAGE_PATH" | while read change; do
  sync_to_container
done
