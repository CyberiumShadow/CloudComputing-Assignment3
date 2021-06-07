variable "CertArn" {
}

resource "aws_elastic_beanstalk_application" "frontend" {
  name        = "neocar-frontend"
  description = "Neocar Frontend"

  appversion_lifecycle {
    service_role          = "arn:aws:iam::860728236313:role/aws-service-role/elasticbeanstalk.amazonaws.com/AWSServiceRoleForElasticBeanstalk"
    max_count             = 2
    delete_source_from_s3 = true
  }
}

resource "aws_elastic_beanstalk_environment" "neocar" {
  name                = "neocar"
  application         = aws_elastic_beanstalk_application.frontend.name
  solution_stack_name = "64bit Amazon Linux 2018.03 v4.17.6 running Node.js"

  setting {
    namespace = "aws:elasticbeanstalk:environment"
    name      = "ServiceRole"
    value     = "aws-elasticbeanstalk-service-role"
  }

  setting {
    namespace = "aws:autoscaling:launchconfiguration"
    name      = "IamInstanceProfile"
    value     = "aws-elasticbeanstalk-ec2-role"
  }

  setting {
    namespace = "aws:elb:listener:443"
    name      = "ListenerProtocol"
    value     = "HTTPS"
  }

  setting {
    namespace = "aws:elb:listener:443"
    name      = "InstancePort"
    value     = "80"
  }

  setting {
    namespace = "aws:elb:listener:443"
    name      = "SSLCertificateId"
    value     = var.CertArn
  }
}

output "env_url" {
  value = aws_elastic_beanstalk_environment.neocar.cname
}
