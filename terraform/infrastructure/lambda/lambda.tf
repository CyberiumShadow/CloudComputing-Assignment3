output "preSignupTrigger" {
  value = aws_lambda_function.cognitoTriggers["presignup"].arn
}

output "postConfirmTrigger" {
  value = aws_lambda_function.cognitoTriggers["postconfirm"].arn
}

variable "cognitoArn" {
}

locals {
  lambdaFuncNames = toset(["presignup", "postconfirm"])
}

resource "aws_iam_role" "iam_for_lambda" {
  name = "iam_for_lambda"

  managed_policy_arns = ["arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole"]

  inline_policy {
    name = "AllowLambdaDynamo"
    policy = jsonencode({
      "Version" : "2012-10-17",
      "Statement" : [
        {
          "Sid" : "ReadWriteTable",
          "Effect" : "Allow",
          "Action" : [
            "dynamodb:BatchGetItem",
            "dynamodb:GetItem",
            "dynamodb:Query",
            "dynamodb:Scan",
            "dynamodb:BatchWriteItem",
            "dynamodb:PutItem",
            "dynamodb:UpdateItem"
          ],
          "Resource" : "arn:aws:dynamodb:*:*:table/users"
        },
        {
          "Sid" : "GetStreamRecords",
          "Effect" : "Allow",
          "Action" : "dynamodb:GetRecords",
          "Resource" : "arn:aws:dynamodb:*:*:table/users/stream/* "
        },
        {
          "Sid" : "WriteLogStreamsAndGroups",
          "Effect" : "Allow",
          "Action" : [
            "logs:CreateLogStream",
            "logs:PutLogEvents"
          ],
          "Resource" : "*"
        },
        {
          "Sid" : "CreateLogGroup",
          "Effect" : "Allow",
          "Action" : "logs:CreateLogGroup",
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

resource "aws_lambda_function" "cognitoTriggers" {
  for_each      = local.lambdaFuncNames
  s3_bucket     = "neocar-lambda"
  s3_key        = "v1.0.0/${each.value}.zip"
  function_name = "${each.value}_trigger"
  role          = aws_iam_role.iam_for_lambda.arn
  handler       = "${each.value}.handler"

  # The filebase64sha256() function is available in Terraform 0.11.12 and later
  # For Terraform 0.11.11 and earlier, use the base64sha256() function and the file() function:
  # source_code_hash = "${base64sha256(file("lambda_function_payload.zip"))}"
  source_code_hash = filebase64sha256("../../artifacts/lambda/${each.value}.zip")

  runtime = "nodejs12.x"
}

resource "aws_lambda_permission" "allow_cognito" {
  for_each      = aws_lambda_function.cognitoTriggers
  statement_id  = "AllowExecutionfromCognito"
  action        = "lambda:InvokeFunction"
  function_name = each.value.function_name
  principal     = "email.cognito-idp.amazonaws.com"
  source_arn    = var.cognitoArn
}
