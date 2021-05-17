resource "aws_apigatewayv2_stage" "neocar_api" {
  api_id = aws_apigatewayv2_api.neocar_api.id
  name   = "$default"

  auto_deploy = true
}

resource "aws_apigatewayv2_api_mapping" "neocar_api" {
  api_id      = aws_apigatewayv2_api.neocar_api.id
  domain_name = aws_apigatewayv2_domain_name.neocar_api.id
  stage       = aws_apigatewayv2_stage.neocar_api.id
}