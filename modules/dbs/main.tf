locals {
  apps = ["signup", "auth", "consultant", "ava", "search", "booking", "chat", "notify", "call", "payment", "review", "send", "socket"]
}

variable "current_user" {
  description = "The user to configure paths in the PV"
  type        = string
}

resource "kubernetes_persistent_volume" "mongo_pv" {
  for_each = { for key in local.apps : key => key }

  metadata {
    name = "${each.key}-mon-pv"
  }

  spec {
    persistent_volume_source {
      local {
        path = "/Users/${var.current_user}/mnt/data/${each.key}"
      }
    }

    capacity = {
      storage = "2Gi"
    }

    storage_class_name = "hostpath"

    # Setting access_modes to ["ReadWriteOnce"] means only one node can 
    # mount and write to the volume at a time, ensuring data consistency
    # and preventing conflicts
    access_modes = ["ReadWriteOnce"]

    persistent_volume_reclaim_policy = "Retain"

    node_affinity {
      required {
        node_selector_term {
          match_expressions {
            key      = "kubernetes.io/hostname"
            operator = "In"
            values   = ["docker-desktop"]
          }
        }
      }
    }

  }
}

resource "kubernetes_persistent_volume_claim" "mongo_pvc" {
  for_each = { for key in local.apps : key => key }

  metadata {
    name = "${each.key}-mon-pvc"
  }

  depends_on = [
    kubernetes_persistent_volume.mongo_pv
  ]

  spec {
    access_modes       = ["ReadWriteOnce"]
    storage_class_name = "hostpath"
    resources {
      requests = {
        storage = "2Gi"
      }
    }
  }
}

resource "kubernetes_deployment" "mongo" {
  for_each = { for key in local.apps : key => key }

  metadata {
    name = "${each.key}-mon"
  }

  depends_on = [
    kubernetes_persistent_volume_claim.mongo_pvc
  ]

  spec {
    replicas = 1

    selector {
      match_labels = {
        app = "${each.key}-mon"
      }
    }

    strategy {
      type = "Recreate"
    }

    template {
      metadata {
        labels = {
          app = "${each.key}-mon"
        }
      }

      spec {
        container {
          image = "mongo:latest"
          name  = "${each.key}-mon"

          port {
            container_port = 27017
            name           = "${each.key}-mon"
          }

          volume_mount {
            name       = "${each.key}-mon-ps" # persistent storage
            mount_path = "/data/db"
          }
        }

        volume {
          name = "${each.key}-mon-ps"

          persistent_volume_claim {
            claim_name = "${each.key}-mon-pvc"
          }
        }
      }
    }
  }
}

resource "kubernetes_service" "mongo_service" {

  for_each = { for key in local.apps : key => key }

  metadata {
    name = "${each.key}-mon"
  }

  depends_on = [
    kubernetes_deployment.mongo
  ]

  spec {
    selector = {
      app = "${each.key}-mon"
    }

    port {
      port        = 27017
      target_port = 27017
    }
  }
}
