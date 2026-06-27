# WhatsApp Integration - AWS EC2 Deployment

This guide will help you deploy your WhatsApp integration application to Amazon EC2.

## Quick Start

1. **Launch an EC2 Instance**
   - AMI: Amazon Linux 2023
   - Instance Type: t3.small or larger
   - Security Group: Allow ports 22, 80, 443, 3000

2. **Upload Your Code**
   ```bash
   # Option 1: Using SCP
   scp -i your-key.pem -r . ec2-user@your-ec2-ip:/home/ec2-user/whatsapp-integration

   # Option 2: Using Git
   ssh -i your-key.pem ec2-user@your-ec2-ip
   git clone https://github.com/your-repo/whatsapp-integration.git
   ```

3. **Run Quick Deploy Script**
   ```bash
   cd whatsapp-integration
   ./quick-deploy.sh
   ```

4. **Configure Environment Variables**
   ```bash
   nano .env
   # Fill in your WhatsApp API credentials
   ```

5. **Restart Application**
   ```bash
   pm2 restart whatsapp-integration
   ```

## Files Included

- `DEPLOYMENT.md` - Complete deployment guide
- `quick-deploy.sh` - Quick deployment script for EC2
- `deploy.sh` - Full deployment script with all dependencies
- `ecosystem.config.js` - PM2 process configuration
- `docker-compose.prod.yml` - Docker production deployment
- `Dockerfile.production` - Optimized production Docker image
- `nginx.conf` - Nginx reverse proxy configuration
- `.env.production` - Production environment template

## Environment Variables Required

```env
WEBHOOK_VERIFY_TOKEN=your_token
WHATSAPP_ACCESS_TOKEN=your_access_token
WHATSAPP_PHONE_NUMBER_ID=your_phone_id
WHATSAPP_BUSINESS_ACCOUNT_ID=your_business_account_id
CLOUD_API_VERSION=17.0
PORT=3000
NODE_ENV=production
```

## Post-Deployment Steps

1. **Set up Domain & SSL**
   - Point your domain to EC2 instance
   - Install SSL certificate (Let's Encrypt recommended)
   - Configure Nginx reverse proxy

2. **Configure WhatsApp Webhook**
   - Go to Meta Developer Console
   - Set webhook URL: `https://your-domain.com/webhook`
   - Subscribe to message events

3. **Test Your Setup**
   ```bash
   # Health check
   curl https://your-domain.com/health
   
   # Webhook verification
   curl "https://your-domain.com/webhook?hub.mode=subscribe&hub.challenge=test&hub.verify_token=your_token"
   ```

## Monitoring

```bash
# Check application status
pm2 status

# View logs
pm2 logs whatsapp-integration

# Monitor resources
pm2 monit

# Check system resources
htop
```

## Support

For detailed deployment instructions, see `DEPLOYMENT.md`.

For issues:
1. Check application logs: `pm2 logs whatsapp-integration`
2. Check system logs: `sudo journalctl -u nginx`
3. Verify environment variables in `.env`
4. Test webhook endpoint manually
