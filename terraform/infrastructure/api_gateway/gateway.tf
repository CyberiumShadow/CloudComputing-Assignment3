resource "aws_apigatewayv2_api" "neocar_api" {
  name          = "neocar-api"
  protocol_type = "HTTP"

  disable_execute_api_endpoint = true
  cors_configuration {
    allow_credentials = false
    allow_origins     = ["*"]
    allow_headers     = ["*", "authorization", "content-type"]
    allow_methods     = ["DELETE", "GET", "OPTIONS", "PATCH", "POST", "PUT"]
  }
}

resource "aws_apigatewayv2_domain_name" "neocar_api" {
  domain_name = "api.neocar.link"

  domain_name_configuration {
    certificate_arn = var.CertArn
    endpoint_type   = "REGIONAL"
    security_policy = "TLS_1_2"
  }
}

resource "aws_apigatewayv2_vpc_link" "vpclink" {
  name               = "neocar_vpclink"
  security_group_ids = [var.LBSecurityGroup]
  subnet_ids         = var.VPCSubnets
}
