resource "aws_apigatewayv2_route" "name" {
  api_id = aws_apigatewayv2_api.neocar_api.id
  route_key = "GET /v1/cars"
  authorization_type = "JWT"
  authorizer_id = aws_apigatewayv2_authorizer.JWT.id
  target = "integrations/${aws_apigatewayv2_integration.cars.id}"
}