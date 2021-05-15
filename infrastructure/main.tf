terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 3.0"
    }
  }
}

module "cognito" {
  source             = "./cognito"
  CertArn            = module.route53.acmCert
  preSignupTrigger   = module.lambda.preSignupTrigger
  postConfirmTrigger = module.lambda.postConfirmTrigger
}

module "route53" {
  source = "./route53"

  CFDistribution = module.s3.CFDistribution
  PoolDomain     = module.cognito.PoolDomain
  PoolDomainCF   = module.cognito.PoolDomainCF
  APIDomain      = module.api.APIDomain
  APITarget      = module.api.APITarget
  APIZone        = module.api.APIZone
}

module "dynamodb" {
  source = "./dynamodb"
}

module "s3" {
  source = "./s3"

  CertArn = module.route53.acmCert
}

module "api" {
  source = "./api_gateway"

  CertArn = module.route53.acmCert
}

module "lambda" {
  source = "./lambda"

  cognitoArn = module.cognito.cognitoArn
}