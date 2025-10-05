output "assets_bucket" { value = aws_s3_bucket.assets.bucket }
output "cdn_domain_name" { value = aws_cloudfront_distribution.cdn.domain_name }
output "db_endpoint" { value = aws_db_instance.db.address }
output "queue_url" { value = aws_sqs_queue.events.id }