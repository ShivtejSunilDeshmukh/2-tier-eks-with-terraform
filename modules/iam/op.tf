output "eks_cluster_role_arn" {
description = "IAM role ARN used by the EKS control plane"
value       = aws_iam_role.eks_cluster.arn
}

output "eks_cluster_role_name" {
description = "IAM role name used by the EKS control plane"
value       = aws_iam_role.eks_cluster.name
}



output "eks_node_role_arn" {
  description = "IAM role ARN used by EKS worker nodes"
  value       = aws_iam_role.eks_node.arn
}

output "eks_node_role_name" {
  description = "IAM role name used by EKS worker nodes"
  value       = aws_iam_role.eks_node.name
}