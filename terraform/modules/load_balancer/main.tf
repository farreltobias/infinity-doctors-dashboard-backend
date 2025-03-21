resource "aws_security_group" "lb_sg" {
  vpc_id = var.vpc_id

  ingress {
    from_port = 80
    to_port   = 80
    protocol  = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port = 0
    to_port   = 0
    protocol  = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

resource "aws_lb" "dashboard_alb" {
  name               = "dashboard-alb"
  internal           = false
  load_balancer_type = "application"
  security_groups = [aws_security_group.lb_sg.id]
  subnets            = var.subnets

  enable_deletion_protection = false

  tags = {
    Name = "dashboard-alb"
  }
}

resource "aws_lb_target_group" "dashboard_target_group" {
  name        = "dashboard-target-group"
  port        = 80
  protocol    = "HTTP"
  vpc_id      = var.vpc_id
  target_type = "ip"

  health_check {
    path                = "/"
    protocol            = "HTTP"
    interval            = 30
    timeout             = 5
    healthy_threshold   = 2
    unhealthy_threshold = 2
  }

  lifecycle {
    create_before_destroy = true
  }

  tags = {
    Name = "dashboard-target-group"
  }
}

resource "aws_lb_listener" "http" {
  load_balancer_arn = aws_lb.dashboard_alb.arn
  port              = "80"
  protocol          = "HTTP"

  default_action {
    type             = "forward"
    target_group_arn = aws_lb_target_group.dashboard_target_group.arn
  }
}
