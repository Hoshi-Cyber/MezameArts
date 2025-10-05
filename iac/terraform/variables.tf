variable "project" { type = string, default = "mezame-arts" }
variable "aws_region" { type = string, default = "us-east-1" }
variable "domain" { type = string, default = "mezamearts.com" }
variable "cdn_domain" { type = string, default = "assets.mezamearts.com" }
variable "db_username" { type = string, default = "mezame_admin" }
variable "db_password" { type = string, sensitive = true }