output "preSignupTrigger" {
  value = aws_lambda_function.presignupTrigger.arn
}

output "bookingHistory" {
  value = aws_lambda_function.bookingHistory.invoke_arn
}
