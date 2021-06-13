output "userPoolID" {
  value = aws_cognito_user_pool_client.login.id
}

output "cognitoArn" {
  value = aws_cognito_user_pool.login.arn
}

output "endpoint" {
  value = aws_cognito_user_pool.login.endpoint
}

output "PoolDomainCF" {
  value = aws_cognito_user_pool_domain.login.cloudfront_distribution_arn
}

output "PoolDomain" {
  value = aws_cognito_user_pool_domain.login.domain
}
