resource "aws_acm_certificate" "cert" {
  domain_name       = "neocar.link"
  validation_method = "DNS"

  lifecycle {
    create_before_destroy = true
  }
}

output "acmCert" {
  value = aws_acm_certificate.cert.arn
}

resource "aws_acm_certificate_validation" "example" {
  certificate_arn         = aws_acm_certificate.cert.arn
  validation_record_fqdns = [for record in aws_route53_record.acm : record.fqdn]
}