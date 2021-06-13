resource "aws_cognito_user_pool" "login" {
  # This is choosen when creating a user pool in the console
  name = "login"

  # ATTRIBUTES
  alias_attributes = ["email", "preferred_username"]

  lambda_config {
    pre_sign_up = var.preSignupTrigger
  }

  # POLICY
  password_policy {
    minimum_length                   = "8"
    require_lowercase                = false
    require_numbers                  = false
    require_symbols                  = false
    require_uppercase                = false
    temporary_password_validity_days = 7
  }

  # MFA & VERIFICATIONS
  mfa_configuration        = "OFF"
  auto_verified_attributes = ["email"]

  # MESSAGE CUSTOMIZATIONS
  verification_message_template {
    default_email_option  = "CONFIRM_WITH_LINK"
    email_message_by_link = "Your life will be dramatically improved by signing up! {##Click Here##}"
    email_subject_by_link = "Welcome to to a new world and life!"
  }

  #email_configuration {
  #  reply_to_email_address = "a-email-for-people-to@reply.to"
  #}

  # TAGS
  tags = {
    project = "No Meat May"
  }

  # DEVICES
  device_configuration {
    challenge_required_on_new_device      = true
    device_only_remembered_on_user_prompt = true
  }
}
