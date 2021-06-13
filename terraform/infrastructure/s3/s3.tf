data "aws_s3_bucket" "neocar_uploads" {
  bucket = "cdn.neocar.link"
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
