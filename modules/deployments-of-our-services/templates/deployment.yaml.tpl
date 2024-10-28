apiVersion: apps/v1
kind: Deployment
metadata:
  name: ${app_name}-d
spec:
  replicas: 1
  selector:
    matchLabels:
      app: ${app_name}
  template:
    metadata:
      labels:
        app: ${app_name}
      annotations:
        secret_checksum: "${secret_checksum}"
    spec:
      containers:
      - name: ${app_name}
        image: ${app_name}
        ports:
        - containerPort: 3000
        - containerPort: 9229
        envFrom:
        - secretRef:
            name: ${app_name}-secret
