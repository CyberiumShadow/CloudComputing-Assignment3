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
  CFDistribution = module.s3.CFDistribution
  PoolDomain   = module.cognito.PoolDomain
  PoolDomainCF = module.cognito.PoolDomainCF
}

module "dynamodb" {
  source = "./dynamodb"
}

module "s3" {
  source = "./s3"

  CertArn = module.route53.acmCert
}