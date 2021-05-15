resource "aws_dynamodb_table" "neocar_users" {
  name           = "neocar_users"
  billing_mode   = "PROVISIONED"
  write_capacity = 5
  read_capacity  = 5

  hash_key = "username"
  attribute {
    name = "username"
    type = "S"
  }

  tags = {
    "Name" = "Neocar Users"
  }
}