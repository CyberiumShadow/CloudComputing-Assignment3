terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 3.0"
    }
  }
}

module "cognito" {
  source  = "./cognito"
  CertArn = module.route53.acmCert
}

module "route53" {
  source       = "./route53"
  PoolDomain   = module.cognito.PoolDomain
  PoolDomainCF = module.cognito.PoolDomainCF
}