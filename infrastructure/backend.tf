terraform {
  backend "remote" {
    organization = "s3720461-cc-a3"

    workspaces {
      name = "Assignment-3"
    }
  }
}