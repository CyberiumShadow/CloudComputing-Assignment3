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
  ebs_url        = module.beanstalk.env_url
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

  CertArn         = module.route53.acmCert
  CognitoEndpoint = module.cognito.endpoint
  CognitoClientID = module.cognito.userPoolID
  VPCSubnets      = module.ecs.private_subnets
  LBSecurityGroup = module.ecs.security_group
  LBListener      = module.ecs.lb_listener
}

module "lambda" {
  source = "./lambda"

  cognitoArn = module.cognito.cognitoArn
}

module "ecr" {
  source = "./ecr"
}

module "ecs" {
  source = "./ecs"

  ecr_repo = module.ecr.ecr_repo_url
}

module "beanstalk" {
  source = "./beanstalk"
}

output "ecr_repo_url" {
  value = module.ecr.ecr_repo_url
}
