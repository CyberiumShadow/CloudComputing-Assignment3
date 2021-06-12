terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 3.0"
    }
  }
}

data "terraform_remote_state" "env" {
  backend = "remote"

  config = {
    organization = "s3720461-cc-a3"

    workspaces = {
      name = "Assignment3_Environment"
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

module "s3" {
  source = "./s3"

  CertArn = module.route53.acmCert
}

module "ecs" {
  source = "./ecs"

  ecr_repo_url = data.terraform_remote_state.env.outputs.ecr_repo_url
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

module "beanstalk" {
  source = "./beanstalk"

  CertArn = module.route53.acmCert
}
