provider "aws" {
  region = var.aws_region

  default_tags {
    tags = {
      Project     = "eks-platform"
      Environment = "dev"
      ManagedBy   = "Terraform"
    }
  }
}