variable "run_our_service" {
  description = "Whether to run the deployment resources as part of the terraform apply (true) or not and instead generate yaml files that represent the resources (false) so that tilt will run them (we use Tilt to achieve local debugger and hot reloads (code sync) capabilities)"
  type        = bool
  default     = false
}

variable "secret_checksums" {
  type = map(string)
}

locals {
  apps             = ["signup", "auth", "consultant", "ava", "search", "booking", "chat", "notify", "call", "payment", "review", "send", "socket"]
  image_tag        = "latest" # todo: is this smart?
  secret_checksums = var.secret_checksums
}

# Conditionally generate YAML files or deploy directly
resource "local_file" "k8s_manifest" {
  for_each = var.run_our_service ? {} : { for app in local.apps : app => app }
  content = templatefile("${path.module}/templates/deployment.yaml.tpl", {
    app_name  = each.value,
    image_tag = local.image_tag,
  })
  filename = "${path.module}/../../k8s/${each.value}-d.yaml" # Save the file in the k8s directory, make sure to match the path in the tilt file
}

output "deployment_yaml_paths" {
  value = var.run_our_service ? [] : [for app in local.apps : local_file.k8s_manifest[app].filename]
}

# Deployment resources
resource "kubernetes_deployment" "app_deployment" {
  for_each = var.run_our_service ? { for app in local.apps : app => app } : {} # run the deployments resources only if deploying locally

  metadata {
    name = "${each.value}-d"
  }

  spec {
    replicas = 1

    selector {
      match_labels = {
        app = each.value
      }
    }

    template {
      metadata {
        labels = {
          app = each.value
        }
        annotations = { # This is used to trigger a rolling update when the secret changes
          secret_checksum = local.secret_checksums[each.value]
        }
      }

      spec {
        container {
          name  = each.value
          image = "${each.value}:${local.image_tag}"

          resources {
            requests = {
              memory = "256Mi"
              cpu    = "400m"
            }

            limits = {
              memory = "512Mi"
              cpu    = "800m"
            }
          }

          # Include the envFrom to load secrets
          env_from {
            secret_ref {
              name = "${each.value}-secret"
            }
          }
        }
      }
    }
  }
}

# ervice resource:
resource "kubernetes_service" "app_service" {
  for_each = { for app in local.apps : app => app }

  metadata {
    name = "${each.value}-s"
  }
  spec {
    selector = {
      app = each.value
    }
    port {
      name        = each.value
      protocol    = "TCP"
      port        = 3000
      target_port = 3000
    }

    type = "ClusterIP" # this is the default
  }
}

