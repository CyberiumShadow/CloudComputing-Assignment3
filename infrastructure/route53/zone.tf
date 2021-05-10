variable "PoolDomainCF" {
}

variable "PoolDomain" {
}

resource "aws_route53_zone" "main" {
  name = "neocar.link"
}

resource "aws_route53_record" "dummy" {
  name    = "neocar.link"
  type    = "A"
  zone_id = aws_route53_zone.main.zone_id
  ttl     = "60"
  records = ["1.1.1.1"]
}

resource "aws_route53_record" "auth-cognito-A" {
  name    = var.PoolDomain
  type    = "A"
  zone_id = aws_route53_zone.main.zone_id
  alias {
    evaluate_target_health = false
    name                   = var.PoolDomainCF
    # This zone_id is fixed
    zone_id = "Z2FDTNDATAQYW2"
  }
}

resource "aws_route53_record" "acm" {
  for_each = {
    for dvo in aws_acm_certificate.cert.domain_validation_options : dvo.domain_name => {
      name   = dvo.resource_record_name
      record = dvo.resource_record_value
      type   = dvo.resource_record_type
    }
  }

  allow_overwrite = true
  name            = each.value.name
  records         = [each.value.record]
  ttl             = 60
  type            = each.value.type
  zone_id         = aws_route53_zone.main.zone_id
}