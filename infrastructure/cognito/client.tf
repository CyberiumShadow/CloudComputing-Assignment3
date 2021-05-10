resource "aws_cognito_user_pool_client" "login" {
  user_pool_id = aws_cognito_user_pool.login.id

  # APP CLIENTS
  name                   = "login-client"
  refresh_token_validity = 30
  allowed_oauth_flows    = ["code"]

  # APP INTEGRATION -
  # APP CLIENT SETTINGS
  supported_identity_providers = ["COGNITO"]
  callback_urls                = ["http://localhost:3000"]
  logout_urls                  = ["http://localhost:3000"]
}