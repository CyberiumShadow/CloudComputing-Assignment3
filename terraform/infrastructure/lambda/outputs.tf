output "preSignupTrigger" {
  value = aws_lambda_function.cognitoTriggers["presignup"].arn
}
