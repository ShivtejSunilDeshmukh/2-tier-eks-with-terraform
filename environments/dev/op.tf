output "vpc_id" {
  description = "VPC ID"
  value       = module.vpc.vpc_id
}

output "vpc_cidr" {
  description = "VPC CIDR"
  value       = module.vpc.vpc_cidr
}

output "public_subnet_ids" {
  description = "Public subnet IDs"
  value       = module.vpc.public_subnet_ids
}

output "private_subnet_ids" {
  description = "Private subnet IDs"
  value       = module.vpc.private_subnet_ids
}

output "availability_zones" {
  description = "Availability zones"
  value       = module.vpc.availability_zones
}

output "eks_cluster_name" {
  description = "EKS cluster name"
  value       = module.eks.cluster_name
}

output "eks_cluster_endpoint" {
  description = "EKS cluster endpoint"
  value       = module.eks.cluster_endpoint
}

output "eks_cluster_arn" {
  description = "EKS cluster ARN"
  value       = module.eks.cluster_arn
}

output "eks_cluster_role_arn" {
  description = "IAM role ARN used by EKS control plane"
  value       = module.iam.eks_cluster_role_arn
}
output "eks_node_group_name" {
  description = "EKS managed node group name"
  value       = module.eks.node_group_name
}