# S3 bucket for uploads/static
resource "aws_s3_bucket" "assets" {
  bucket = "${var.project}-assets"
}

# CloudFront CDN for assets
resource "aws_cloudfront_distribution" "cdn" {
  enabled             = true
  is_ipv6_enabled     = true
  default_root_object = "index.html"

  origin {
    domain_name = aws_s3_bucket.assets.bucket_regional_domain_name
    origin_id   = "s3-assets"
  }

  default_cache_behavior {
    target_origin_id       = "s3-assets"
    viewer_protocol_policy = "redirect-to-https"
    allowed_methods        = ["GET", "HEAD"]
    cached_methods         = ["GET", "HEAD"]
    forwarded_values {
      query_string = false
      cookies { forward = "none" }
    }
  }

  restrictions { geo_restriction { restriction_type = "none" } }
  viewer_certificate { cloudfront_default_certificate = true }
}

# WAFv2 Web ACL placeholder
resource "aws_wafv2_web_acl" "waf" {
  name        = "${var.project}-waf"
  description = "Baseline protections"
  scope       = "CLOUDFRONT"

  default_action { allow {} }

  visibility_config {
    cloudwatch_metrics_enabled = true
    metric_name                = "${var.project}-waf"
    sampled_requests_enabled   = true
  }
}

# RDS PostgreSQL (dev size)
resource "aws_db_instance" "db" {
  identifier                 = "${var.project}-db"
  engine                     = "postgres"
  engine_version             = "15"
  instance_class             = "db.t3.micro"
  allocated_storage          = 20
  username                   = var.db_username
  password                   = var.db_password
  skip_final_snapshot        = true
  publicly_accessible        = false
}

# SQS queue for async tasks
resource "aws_sqs_queue" "events" {
  name = "${var.project}-events"
}