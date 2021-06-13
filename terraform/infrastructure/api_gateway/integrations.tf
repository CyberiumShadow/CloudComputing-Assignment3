resource "aws_apigatewayv2_integration" "cars" {
  api_id             = aws_apigatewayv2_api.neocar_api.id
  integration_type   = "HTTP_PROXY"
  integration_method = "ANY"
  integration_uri    = var.LBListener
  connection_type    = "VPC_LINK"
  connection_id      = aws_apigatewayv2_vpc_link.vpclink.id
}

resource "aws_apigatewayv2_integration" "bookingHistory" {
  api_id                 = aws_apigatewayv2_api.neocar_api.id
  integration_type       = "AWS_PROXY"
  integration_method     = "POST"
  payload_format_version = "2.0"
  integration_uri        = var.BookingHistory
}

resource "aws_apigatewayv2_integration" "listingHistory" {
  api_id                 = aws_apigatewayv2_api.neocar_api.id
  integration_type       = "AWS_PROXY"
  integration_method     = "POST"
  payload_format_version = "2.0"
  integration_uri        = var.ListingHistory
}
