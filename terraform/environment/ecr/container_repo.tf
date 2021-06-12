resource "aws_ecr_repository" "neocar_ecr" {
  name                 = "neocar"
  image_tag_mutability = "MUTABLE"

  image_scanning_configuration {
    scan_on_push = true
  }
}

output "ecr_repo_url" {
  value = aws_ecr_repository.neocar_ecr.repository_url
}
