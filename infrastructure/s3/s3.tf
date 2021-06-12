resource "aws_s3_bucket" "neocar_uploads" {
  bucket = "cdn.neocar.link"
  acl    = "private"

  force_destroy = true
  tags = {
    Name = "Neocar Uploads"
  }
}

resource "aws_s3_bucket" "neocar_lambda" {
  bucket = "neocar-lambda"
  acl    = "private"

  force_destroy = true
  tags = {
    Name = "Neocar Lambda Functions"
  }
}

resource "aws_s3_bucket_object" "lambda_postconfirm" {
  bucket = aws_s3_bucket.neocar_lambda.bucket
  key    = "v1.0.0/postconfirm.zip"
  source = "../artifacts/lambda/postconfirm.zip"

  # The filemd5() function is available in Terraform 0.11.12 and later
  # For Terraform 0.11.11 and earlier, use the md5() function and the file() function:
  # etag = "${md5(file("path/to/file"))}"
  etag = filemd5("../artifacts/lambda/postconfirm.zip")
}

resource "aws_s3_bucket_object" "lambda_presignup" {
  bucket = aws_s3_bucket.neocar_lambda.bucket
  key    = "v1.0.0/presignup.zip"
  source = "../artifacts/lambda/presignup.zip"

  # The filemd5() function is available in Terraform 0.11.12 and later
  # For Terraform 0.11.11 and earlier, use the md5() function and the file() function:
  # etag = "${md5(file("path/to/file"))}"
  etag = filemd5("../artifacts/lambda/presignup.zip")
}

resource "aws_s3_bucket_policy" "neocar_uploads_policy" {
  bucket = aws_s3_bucket.neocar_uploads.id

  # Terraform's "jsonencode" function converts a
  # Terraform expression's result to valid JSON syntax.
  policy = jsonencode({
    "Id" : "Policy1620741318881",
    "Version" : "2012-10-17",
    "Statement" : [
      {
        "Sid" : "Stmt1620741315300",
        "Action" : [
          "s3:GetObject"
        ],
        "Effect" : "Allow",
        "Resource" : "arn:aws:s3:::cdn.neocar.link/*",
        "Principal" : {
          "AWS" : [
            "arn:aws:iam::cloudfront:user/CloudFront Origin Access Identity E1QHO4PLRZTZZ9"
          ]
        }
      }
    ]
  })
}
