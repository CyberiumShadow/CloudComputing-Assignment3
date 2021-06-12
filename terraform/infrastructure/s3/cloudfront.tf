locals {
  s3_origin_id = "NeocarOrigin"
}

variable "CertArn" {
}

output "CFDistribution" {
  value = aws_cloudfront_distribution.s3_distribution.domain_name
}

resource "aws_cloudfront_origin_access_identity" "s3_oai" {
  comment = "Neocar.link S3 OAI"
}

resource "aws_cloudfront_cache_policy" "s3_cache_policy" {
  name    = "neocar-cdn-cache"
  comment = "cdn.neocar.link cache policy"

  min_ttl     = 0
  default_ttl = 600
  max_ttl     = 3600

  parameters_in_cache_key_and_forwarded_to_origin {
    cookies_config {
      cookie_behavior = "none"
    }
    headers_config {
      header_behavior = "none"
    }
    query_strings_config {
      query_string_behavior = "none"
    }

    enable_accept_encoding_brotli = true
    enable_accept_encoding_gzip   = true
  }
}

resource "aws_cloudfront_origin_request_policy" "s3_origin_policy" {
  name    = "neocar-cdn-origin"
  comment = "cdn.neocar.link origin policy"

  cookies_config {
    cookie_behavior = "none"
  }
  headers_config {
    header_behavior = "whitelist"
    headers {
      items = ["origin", "access-control-request-headers", "access-control-request-method"]
    }
  }
  query_strings_config {
    query_string_behavior = "none"
  }
}

resource "aws_cloudfront_distribution" "s3_distribution" {
  retain_on_delete = true

  origin {
    domain_name = data.aws_s3_bucket.neocar_uploads.bucket_regional_domain_name
    origin_id   = local.s3_origin_id

    s3_origin_config {
      origin_access_identity = aws_cloudfront_origin_access_identity.s3_oai.cloudfront_access_identity_path
    }
  }

  enabled = true
  comment = "Neocar S3 Distribution"

  aliases = ["cdn.neocar.link"]

  default_cache_behavior {
    allowed_methods          = ["DELETE", "GET", "HEAD", "OPTIONS", "PATCH", "POST", "PUT"]
    cached_methods           = ["GET", "HEAD"]
    cache_policy_id          = aws_cloudfront_cache_policy.s3_cache_policy.id
    origin_request_policy_id = aws_cloudfront_origin_request_policy.s3_origin_policy.id

    target_origin_id       = local.s3_origin_id
    viewer_protocol_policy = "redirect-to-https"
  }

  price_class = "PriceClass_All"

  restrictions {
    geo_restriction {
      restriction_type = "whitelist"
      locations        = ["AU"]
    }
  }

  tags = {
    Environment = "production"
  }

  viewer_certificate {
    acm_certificate_arn = var.CertArn
    ssl_support_method  = "sni-only"
  }
}
