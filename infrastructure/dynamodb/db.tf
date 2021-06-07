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

resource "aws_dynamodb_table" "cars" {
  name           = "cars"
  billing_mode   = "PROVISIONED"
  write_capacity = 5
  read_capacity  = 5

  hash_key = "licence_plate"
  attribute {
    name = "licence_plate"
    type = "S"
  }

  tags = {
    "Name" = "Neocar Cars"
  }
}

resource "aws_dynamodb_table" "bookings" {
  name           = "bookings"
  billing_mode   = "PROVISIONED"
  write_capacity = 5
  read_capacity  = 5

  hash_key = "booking_id"
  attribute {
    name = "booking_id"
    type = "S"
  }

  attribute {
    name = "user_id"
    type = "S"
  }

  attribute {
    name = "licence_plate"
    type = "S"
  }

  global_secondary_index {
    name            = "Booking_UserID"
    hash_key        = "user_id"
    projection_type = "ALL"
    write_capacity  = 5
    read_capacity   = 5
  }

  global_secondary_index {
    name            = "Booking_CarID"
    hash_key        = "licence_plate"
    projection_type = "ALL"
    write_capacity  = 5
    read_capacity   = 5
  }

  tags = {
    "Name" = "Neocar Cars"
  }
}
