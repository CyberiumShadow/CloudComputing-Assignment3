resource "aws_cognito_user_pool_client" "login" {
  user_pool_id = aws_cognito_user_pool.login.id

  # APP CLIENTS
  name                                 = "login-client"
  refresh_token_validity               = 30
  allowed_oauth_flows                  = ["code"]
  allowed_oauth_flows_user_pool_client = true
  allowed_oauth_scopes                 = ["aws.cognito.signin.user.admin", "openid"]
  explicit_auth_flows                  = ["ALLOW_CUSTOM_AUTH", "ALLOW_REFRESH_TOKEN_AUTH", "ALLOW_USER_SRP_AUTH"]

  # APP INTEGRATION -
  # APP CLIENT SETTINGS
  supported_identity_providers = ["COGNITO"]
  callback_urls                = ["http://localhost:3000/callback", "https://neocar.link/callback"]
  logout_urls                  = ["http://localhost:3000", "https://neocar.link"]
}