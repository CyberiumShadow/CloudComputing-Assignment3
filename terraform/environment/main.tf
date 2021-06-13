terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 3.0"
    }
  }
}

module "dynamodb" {
  source = "./dynamodb"
}

module "s3" {
  source = "./s3"
}

module "ecr" {
  source = "./ecr"
}

module "route53" {
  source = "./route53"
}

output "ecr_repo_url" {
  value = module.ecr.ecr_repo_url
}
