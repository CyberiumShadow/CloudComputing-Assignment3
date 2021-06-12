variable "ecr_repo_url" {
}

data "aws_ecr_image" "api_image" {
  repository_name = "neocar"
  image_tag       = "buildx-latest"
}

resource "aws_ecs_task_definition" "api" {
  family             = "neocar-api"
  execution_role_arn = aws_iam_role.ecs_task_execution_role.arn
  task_role_arn      = aws_iam_role.iam_for_ecs.arn

  requires_compatibilities = ["FARGATE"]
  cpu                      = 256
  memory                   = 512
  network_mode             = "awsvpc"
  container_definitions = jsonencode([
    {
      name      = "neocar-api"
      image     = "${var.ecr_repo_url}:buildx-latest@${data.aws_ecr_image.api_image.image_digest}"
      cpu       = 256
      memory    = 512
      essential = true
      logConfiguration = {
        logDriver : "awslogs",
        options : {
          awslogs-group : "/ecs/neocar",
          awslogs-region : "us-east-1",
          awslogs-stream-prefix : "ecs"
        }
      }
      portMappings = [
        {
          containerPort = 3000,
          hostPost      = 3000
        }
      ]
    }
  ])

  depends_on = [
    data.aws_ecr_image.api_image
  ]
}

resource "aws_iam_role" "iam_for_ecs" {
  name = "iam_for_ecs"


  inline_policy {
    name = "AllowLambdaDynamo"
    policy = jsonencode({
      "Version" : "2012-10-17",
      "Statement" : [
        {
          "Sid" : "VisualEditor0",
          "Effect" : "Allow",
          "Action" : [
            "dynamodb:BatchGetItem",
            "s3:PutObject",
            "s3:GetObject",
            "dynamodb:BatchWriteItem",
            "dynamodb:PutItem",
            "dynamodb:DeleteItem",
            "dynamodb:GetItem",
            "dynamodb:Scan",
            "dynamodb:Query",
            "dynamodb:UpdateItem",
            "s3:ListBucket",
            "s3:DeleteObject"
          ],
          "Resource" : [
            "arn:aws:dynamodb:us-east-1:860728236313:table/*",
            "arn:aws:s3:::cdn.neocar.link/*",
            "arn:aws:s3:::cdn.neocar.link"
          ]
        },
        {
          "Sid" : "VisualEditor1",
          "Effect" : "Allow",
          "Action" : "dynamodb:ListTables",
          "Resource" : "*"
        }
      ]
    })
  }

  assume_role_policy = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Action": "sts:AssumeRole",
      "Principal": {
        "Service": "ecs-tasks.amazonaws.com"
      },
      "Effect": "Allow",
      "Sid": ""
    }
  ]
}
EOF
}
