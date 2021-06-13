data "aws_s3_bucket" "neocar_lambda" {
  bucket = "neocar-lambda"
}
resource "aws_s3_bucket_object" "lambda_bookinghistory" {
  bucket = data.aws_s3_bucket.neocar_lambda.bucket
  key    = "v1.0.0/bookingHistory.zip"
  source = "../../artifacts/lambda/bookingHistory.zip"

  # The filemd5() function is available in Terraform 0.11.12 and later
  # For Terraform 0.11.11 and earlier, use the md5() function and the file() function:
  # etag = "${md5(file("path/to/file"))}"
  etag = filemd5("../../artifacts/lambda/bookingHistory.zip")
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
