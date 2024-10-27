
# locals block to define the list of services
locals {
  services = [
    "signup", "auth", "consultant", "ava", "search", "booking",
    "chat", "notify", "call", "payment", "review", "send", "socket"
  ]
}

# Mapping of service names to their secret JSON file paths
locals {
  service_secrets = {
    for service in local.services :
    service => "${path.module}/${service}_secrets.json"
  }
}

# Load each secret JSON file and create a Kubernetes Secret
resource "kubernetes_secret" "service_secrets" {
  for_each = local.service_secrets

  metadata {
    name      = "${each.key}-secret"
    namespace = "default"
  }

  type = "Opaque"

  # Load the JSON file and use its contents as string_data
  data = {
    for key, value in jsondecode(file(each.value)) :
    key => base64encode(value)
  }
}

# Outputs (optional)
output "created_secrets" {
  value = [for secret in kubernetes_secret.service_secrets : secret.metadata[0].name]
}
