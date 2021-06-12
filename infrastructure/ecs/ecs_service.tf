resource "aws_ecs_service" "neocar_ecs_service" {
  name            = "neocar"
  cluster         = aws_ecs_cluster.neocar_ecs_cluster.id
  task_definition = aws_ecs_task_definition.api.arn
  desired_count   = 1

  launch_type          = "FARGATE"
  force_new_deployment = true

  network_configuration {
    security_groups  = [aws_security_group.ecs_tasks.id]
    subnets          = aws_subnet.private.*.id
    assign_public_ip = true
  }

  load_balancer {
    target_group_arn = aws_alb_target_group.app.id
    container_name   = "neocar-api"
    container_port   = var.app_port
  }

  depends_on = [aws_alb_listener.front_end, aws_iam_role.ecs_task_execution_role]
}
