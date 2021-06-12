output "private_subnets" {
  value = aws_subnet.private.*.id
}

output "security_group" {
  value = aws_security_group.lb.id
}

output "lb_listener" {
  value = aws_alb_listener.front_end.arn
}
