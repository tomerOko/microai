

terraform {
  required_providers {
    kubernetes = {
      source  = "hashicorp/kubernetes"
      version = ">= 2.0.0"
    }
    helm = {
      source  = "hashicorp/helm"
      version = ">= 2.0.0"
    }
  }
}

provider "kubernetes" {
  config_path    = "~/.kube/config"
  config_context = "docker-desktop"
}

provider "helm" {
  kubernetes {
    config_path    = "~/.kube/config"
    config_context = "docker-desktop"
  }
}

resource "helm_release" "nginix-ingress-controller" {
  name       = "ingress-nginx"
  repository = "https://kubernetes.github.io/ingress-nginx"
  chart      = "ingress-nginx"
}

resource "kubernetes_ingress_v1" "ingress_rules" {
  metadata {
    name = "ingress-rules"
  }

  spec {
    ingress_class_name = "nginx"

    dynamic "rule" {
      for_each = [
        # we can have multiple hosts and for each host, we can have multiple paths
        # ingress will route according to the host and path (even if the ip is the same)
        # {
        #   host = "myapp.local"
        #   paths = [
        #     { app_name = "posts", target_port = 3000 },
        #   ]
        # },
        {
          host = "localhost"
          paths = [
            { app_name = "signup", target_port = 3000 },
            { app_name = "auth", target_port = 3000 },
            { app_name = "consultant", target_port = 3000 },
            { app_name = "ava", target_port = 3000 },
            { app_name = "search", target_port = 3000 },
            { app_name = "booking", target_port = 3000 },
            { app_name = "chat", target_port = 3000 },
            { app_name = "notify", target_port = 3000 },
            { app_name = "call", target_port = 3000 },
            { app_name = "payment", target_port = 3000 },
            { app_name = "review", target_port = 3000 },
            { app_name = "send", target_port = 3000 },
            { app_name = "socket", target_port = 3000 }
          ]
        }
      ]

      content {
        host = rule.value.host

        http {
          dynamic "path" {
            for_each = rule.value.paths

            content {
              path      = "/${path.value.app_name}"
              path_type = "Prefix"

              backend {
                service {
                  name = "${path.value.app_name}-s"
                  port {
                    number = path.value.target_port
                  }
                }
              }
            }
          }
        }
      }
    }

  }
}

# (Module) deployments of services under development
module "deployments_of_our_services" {
  source = "./modules/deployments-of-our-services"
}

# (Module) databases
module "dbs" {
  source = "./modules/dbs"
}

module "secrets" {
  source = "./modules/secrets"
}

//todo: export to a model
resource "helm_release" "rabbitmq" {
  name       = "rabbitmq"
  repository = "https://charts.bitnami.com/bitnami"
  chart      = "rabbitmq"
  timeout    = 900
  # namespace        = "rabbitmq"
  # create_namespace = true
  wait = false


  set {
    name  = "auth.username"
    value = "user"
  }

  set {
    name  = "auth.password"
    value = "password"
  }

  set {
    name  = "replicaCount"
    value = "3"
  }

  set {
    name  = "auth.erlangCookie"
    value = "some_secret_cookie"
  }

  set {
    name  = "metrics.enabled"
    value = "true"
  }

  # Optionally, set resource requests and limits
  set {
    name  = "resources.limits.cpu"
    value = "1000m"
  }

  set {
    name  = "resources.limits.memory"
    value = "2048Mi"
  }

  set {
    name  = "resources.requests.cpu"
    value = "600m"
  }

  set {
    name  = "resources.requests.memory"
    value = "1024Mi"
  }

  set {
    name  = "persistence.size"
    value = "8Gi"
  }

  set {
    name  = "persistence.storageClass"
    value = "hostpath"
  }
}


