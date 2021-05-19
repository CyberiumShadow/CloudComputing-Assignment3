variable "CognitoEndpoint" {
}

variable "CognitoClientID" {
}

resource "aws_apigatewayv2_authorizer" "JWT" {
  api_id           = aws_apigatewayv2_api.neocar_api.id
  authorizer_type  = "JWT"
  identity_sources = ["$request.header.Authorization"]
  name             = "Cognito_AccessToken"

  jwt_configuration {
    audience = [var.CognitoClientID]
    issuer   = "https://${var.CognitoEndpoint}"
  }
}
