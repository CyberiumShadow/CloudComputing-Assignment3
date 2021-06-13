# DOMAIN NAME
resource "aws_cognito_user_pool_domain" "login" {
  user_pool_id = aws_cognito_user_pool.login.id
  # DOMAIN PREFIX
  domain          = "auth.neocar.link"
  certificate_arn = var.CertArn
}
