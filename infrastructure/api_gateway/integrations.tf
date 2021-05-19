resource "aws_apigatewayv2_integration" "cars" {
  api_id = aws_apigatewayv2_api.neocar_api.id
  integration_type = "HTTP_PROXY"
  integration_method = "GET"
  integration_uri = "https://api.thecatapi.com/v1/images/search"
}