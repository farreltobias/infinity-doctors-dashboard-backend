resource "aws_ecs_cluster" "dashboard_cluster" {
  name = var.cluster_name
}

resource "aws_ecs_task_definition" "dashboard_task" {
  family             = "dashboard-task"
  network_mode       = "awsvpc"
  requires_compatibilities = ["FARGATE"]
  cpu                = "256"
  memory             = "512"
  execution_role_arn = var.execution_role_arn

  container_definitions = jsonencode([
    {
      name      = "dashboard-app"
      image     = var.image
      essential = true
      portMappings = [
        {
          containerPort = 3000
          hostPort      = 3000
        }
      ]
    }
  ])
}

resource "aws_ecs_service" "dashboard_service" {
  name            = "dashboard-service"
  cluster         = aws_ecs_cluster.dashboard_cluster.id
  task_definition = aws_ecs_task_definition.dashboard_task.arn
  desired_count   = 1
  launch_type     = "FARGATE"

  network_configuration {
    subnets          = var.subnets
    security_groups = [var.security_group_id]
    assign_public_ip = true
  }

  load_balancer {
    target_group_arn = var.lb_target_group_arn
    container_name   = "dashboard-app"
    container_port   = 3000
  }
}
