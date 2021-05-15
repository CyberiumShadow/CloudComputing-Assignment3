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