data "aws_s3_bucket" "neocar_uploads" {
  bucket = "cdn.neocar.link"
}

data "aws_s3_bucket" "neocar_lambda" {
  bucket = "neocar-lambda"
}

resource "aws_s3_bucket_object" "lambda_presignup" {
  bucket = data.aws_s3_bucket.neocar_lambda.bucket
  key    = "v1.0.0/presignup.zip"
  source = "../../artifacts/lambda/presignup.zip"

  # The filemd5() function is available in Terraform 0.11.12 and later
  # For Terraform 0.11.11 and earlier, use the md5() function and the file() function:
  # etag = "${md5(file("path/to/file"))}"
  etag = filemd5("../../artifacts/lambda/presignup.zip")
}

data "aws_iam_policy_document" "s3_policy" {
  statement {
    actions   = ["s3:GetObject"]
    resources = ["${data.aws_s3_bucket.neocar_uploads.arn}/*"]

    principals {
      type        = "AWS"
      identifiers = [aws_cloudfront_origin_access_identity.s3_oai.iam_arn]
    }
  }
}

resource "aws_s3_bucket_policy" "neocar_uploads_policy" {
  bucket = data.aws_s3_bucket.neocar_uploads.id

  # Terraform's "jsonencode" function converts a
  # Terraform expression's result to valid JSON syntax.
  policy = data.aws_iam_policy_document.s3_policy.json
}
