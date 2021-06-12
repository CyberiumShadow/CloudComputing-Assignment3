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
