output "APIDomain" {
  value = aws_apigatewayv2_domain_name.neocar_api.domain_name
}

output "APITarget" {
  value = aws_apigatewayv2_domain_name.neocar_api.domain_name_configuration[0].target_domain_name
}

output "APIZone" {
  value = aws_apigatewayv2_domain_name.neocar_api.domain_name_configuration[0].hosted_zone_id
}

output "GatewayARN" {
  value = aws_apigatewayv2_api.neocar_api.arn
}
