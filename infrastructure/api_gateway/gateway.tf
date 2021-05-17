variable "CertArn" {
}

output "APIDomain" {
  value = aws_apigatewayv2_domain_name.neocar_api.domain_name
}

output "APITarget" {
  value = aws_apigatewayv2_domain_name.neocar_api.domain_name_configuration[0].target_domain_name
}

output "APIZone" {
  value = aws_apigatewayv2_domain_name.neocar_api.domain_name_configuration[0].hosted_zone_id
}

resource "aws_apigatewayv2_api" "neocar_api" {
  name          = "neocar-api"
  protocol_type = "HTTP"

  disable_execute_api_endpoint = true
  cors_configuration {
    allow_credentials = true
    allow_origins     = ["https://neocar.link"]
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