variable "cognitoArn" {
}

locals {
  lambdaFuncNames = toset(["presignup", "postconfirm"])
}
