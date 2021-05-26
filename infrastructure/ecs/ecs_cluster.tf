resource "aws_ecs_cluster" "neocar_ecs_cluster" {
  name = "neocar"

  setting {
    name  = "containerInsights"
    value = "enabled"
  }
}
