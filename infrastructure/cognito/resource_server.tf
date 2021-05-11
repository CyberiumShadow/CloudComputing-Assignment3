resource "aws_cognito_resource_server" "login" {
  identifier   = "login"
  name         = "login"
  user_pool_id = aws_cognito_user_pool.login.id

  scope {
    scope_name        = "sample-scope"
    scope_description = "a Sample Scope Description"
  }
}