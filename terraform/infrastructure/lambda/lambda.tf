resource "aws_iam_role" "iam_for_lambda" {
  name = "iam_for_lambda"

  managed_policy_arns = ["arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole"]

  inline_policy {
    name = "AllowLambdaDynamo"
    policy = jsonencode({
      "Version" : "2012-10-17",
      "Statement" : [
        {
          "Sid" : "VisualEditor0",
          "Effect" : "Allow",
          "Action" : [
            "dynamodb:BatchGetItem",
            "logs:CreateLogStream",
            "dynamodb:BatchWriteItem",
            "dynamodb:PutItem",
            "dynamodb:GetItem",
            "dynamodb:Scan",
            "dynamodb:Query",
            "dynamodb:UpdateItem",
            "logs:PutLogEvents",
            "logs:CreateLogGroup",
            "dynamodb:GetRecords"
          ],
          "Resource" : "*"
        }
      ]
    })
  }

  assume_role_policy = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Action": "sts:AssumeRole",
      "Principal": {
        "Service": "lambda.amazonaws.com"
      },
      "Effect": "Allow",
      "Sid": ""
    }
  ]
}
EOF
}

resource "aws_lambda_function" "presignupTrigger" {
  s3_bucket     = data.aws_s3_bucket.neocar_lambda.id
  s3_key        = aws_s3_bucket_object.lambda_presignup.id
  function_name = "presignup_trigger"
  role          = aws_iam_role.iam_for_lambda.arn
  handler       = "presignup.handler"

  # The filebase64sha256() function is available in Terraform 0.11.12 and later
  # For Terraform 0.11.11 and earlier, use the base64sha256() function and the file() function:
  # source_code_hash = "${base64sha256(file("lambda_function_payload.zip"))}"
  source_code_hash = filebase64sha256("../../artifacts/lambda/presignup.zip")

  runtime = "nodejs12.x"
}

resource "aws_lambda_function" "bookingHistory" {
  s3_bucket     = data.aws_s3_bucket.neocar_lambda.id
  s3_key        = aws_s3_bucket_object.lambda_bookingHistory.id
  function_name = "bookingHistory"
  role          = aws_iam_role.iam_for_lambda.arn
  handler       = "bookingHistory.handler"

  # The filebase64sha256() function is available in Terraform 0.11.12 and later
  # For Terraform 0.11.11 and earlier, use the base64sha256() function and the file() function:
  # source_code_hash = "${base64sha256(file("lambda_function_payload.zip"))}"
  source_code_hash = filebase64sha256("../../artifacts/lambda/bookingHistory.zip")

  runtime = "nodejs12.x"
}

resource "aws_lambda_function" "listingHistory" {
  s3_bucket     = data.aws_s3_bucket.neocar_lambda.id
  s3_key        = aws_s3_bucket_object.lambda_listingHistory.id
  function_name = "listingHistory"
  role          = aws_iam_role.iam_for_lambda.arn
  handler       = "listingHistory.handler"

  # The filebase64sha256() function is available in Terraform 0.11.12 and later
  # For Terraform 0.11.11 and earlier, use the base64sha256() function and the file() function:
  # source_code_hash = "${base64sha256(file("lambda_function_payload.zip"))}"
  source_code_hash = filebase64sha256("../../artifacts/lambda/listingHistory.zip")

  runtime = "nodejs12.x"
}

resource "aws_lambda_permission" "allow_gateway" {
  for_each      = toset(["bookingHistory", "listingHistory"])
  statement_id  = "AllowExecutionFromAPIGateway"
  action        = "lambda:InvokeFunction"
  function_name = each.key
  principal     = "apigateway.amazonaws.com"
  source_arn    = "${var.gatewayArn}/*"

  depends_on = [
    aws_lambda_function.bookingHistory, aws_lambda_function.listingHistory
  ]
}

resource "aws_lambda_permission" "allow_cognito" {
  statement_id  = "AllowExecutionfromCognito"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.presignupTrigger.function_name
  principal     = "email.cognito-idp.amazonaws.com"
  source_arn    = var.cognitoArn
}
