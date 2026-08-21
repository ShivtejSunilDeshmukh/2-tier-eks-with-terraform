variable "cluster_name" {
  description = "Name of the EKS cluster"
  type        = string
}

variable "cluster_version" {
  description = "Kubernetes version for the EKS cluster"
  type        = string
}

variable "vpc_id" {
  description = "VPC ID where the EKS cluster is deployed"
  type        = string
}

variable "private_subnet_ids" {
  description = "Private subnet IDs used by the EKS cluster"
  type        = list(string)
}

variable "cluster_role_arn" {
  description = "IAM role ARN for the EKS control plane"
  type        = string
}


variable "node_role_arn" {
  description = "IAM role ARN used by the EKS managed node group"
  type        = string
}

variable "node_instance_types" {
  description = "EC2 instance types for EKS worker nodes"
  type        = list(string)

  default = ["t3.small"]
}

variable "node_desired_size" {
  description = "Desired number of EKS worker nodes"
  type        = number

  default = 2
}

variable "node_min_size" {
  description = "Minimum number of EKS worker nodes"
  type        = number

  default = 2
}

variable "node_max_size" {
  description = "Maximum number of EKS worker nodes"
  type        = number

  default = 3
}