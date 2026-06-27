# WhatsApp Integration Deployment Guide for Amazon EC2

## Prerequisites

- AWS Account with EC2 access
- WhatsApp Business API access
- Domain name (for webhook URL)
- SSL certificate (Let's Encrypt recommended)

## Step 1: Launch EC2 Instance

### 1.1 Create EC2 Instance
```bash
# Launch an Amazon Linux 2023 instance
# Recommended: t3.small or larger
# Security Group: Allow inbound traffic on ports 22 (SSH), 80 (HTTP), 443 (HTTPS), and 3000 (for testing)
```

### 1.2 Connect to Instance
```bash
ssh -i your-key.pem ec2-user@your-ec2-ip
```

## Step 2: Prepare the Server

### 2.1 Update System
```bash
sudo yum update -y
sudo yum install -y git docker
```

### 2.2 Install Node.js
```bash
# Install Node.js 18 LTS
curl -fsSL https://rpm.nodesource.com/setup_18.x | sudo bash -
sudo yum install -y nodejs

# Verify installation
node --version
npm --version
```

### 2.3 Install PM2 (Process Manager)
```bash
sudo npm install -g pm2
```

### 2.4 Install Docker and Docker Compose
```bash
# Start Docker service
sudo systemctl start docker
sudo systemctl enable docker
sudo usermod -a -G docker ec2-user

# Install Docker Compose
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose

# Logout and login again for group changes to take effect
exit
# ssh back in
```

## Step 3: Deploy the Application

### Option A: Direct Node.js Deployment

#### 3.1 Upload Your Code
```bash
# Create application directory
sudo mkdir -p /opt/whatsapp-integration
sudo chown ec2-user:ec2-user /opt/whatsapp-integration
cd /opt/whatsapp-integration

# Option 1: Clone from Git (replace with your repo)
git clone https://github.com/your-username/your-repo.git .

# Option 2: Upload files using scp
# scp -i your-key.pem -r ./whatsapp-integration/* ec2-user@your-ec2-ip:/opt/whatsapp-integration/
```

#### 3.2 Install Dependencies and Build
```bash
cd /opt/whatsapp-integration
npm install --production
npm run build
```

#### 3.3 Configure Environment Variables
```bash
# Create .env file
nano .env
```

Add the following content:
```env
WEBHOOK_VERIFY_TOKEN=your_webhook_verify_token
EFFECTZGPT_ENDPOINT=your_effectzgpt_endpoint
WHATSAPP_ACCESS_TOKEN=your_whatsapp_access_token
WHATSAPP_BUSINESS_ACCOUNT_ID=your_business_account_id
WHATSAPP_PHONE_NUMBER_ID=your_phone_number_id
CLOUD_API_VERSION=17.0
PORT=3000
NODE_ENV=production
```

#### 3.4 Start with PM2
```bash
# Create logs directory
mkdir -p logs

# Start the application
pm2 start ecosystem.config.js --env production

# Save PM2 configuration
pm2 save

# Setup auto-startup
pm2 startup
# Follow the instructions provided by the command above
```

### Option B: Docker Deployment

#### 3.1 Upload Your Code
```bash
cd /home/ec2-user
# Upload your code here
```

#### 3.2 Create Environment File
```bash
# Create .env file for Docker Compose
nano .env
```

Add the environment variables as shown above.

#### 3.3 Deploy with Docker Compose
```bash
# Build and start the application
docker-compose -f docker-compose.prod.yml up -d

# Check logs
docker-compose -f docker-compose.prod.yml logs -f
```

## Step 4: Set Up Reverse Proxy (Nginx)

### 4.1 Install Nginx
```bash
sudo yum install -y nginx
```

### 4.2 Configure Nginx
```bash
# Backup default config
sudo cp /etc/nginx/nginx.conf /etc/nginx/nginx.conf.backup

# Use our custom configuration
sudo cp nginx.conf /etc/nginx/nginx.conf

# Edit the configuration file
sudo nano /etc/nginx/nginx.conf
# Replace 'your-domain.com' with your actual domain
```

### 4.3 SSL Certificate (Let's Encrypt)
```bash
# Install Certbot
sudo yum install -y python3-pip
sudo pip3 install certbot certbot-nginx

# Get SSL certificate
sudo certbot --nginx -d your-domain.com -d www.your-domain.com

# Auto-renewal setup
sudo crontab -e
# Add this line:
# 0 12 * * * /usr/bin/certbot renew --quiet
```

### 4.4 Start Nginx
```bash
sudo systemctl start nginx
sudo systemctl enable nginx
sudo systemctl status nginx
```

## Step 5: Configure Security Groups

### 5.1 Update EC2 Security Group
- Allow inbound traffic on port 80 (HTTP)
- Allow inbound traffic on port 443 (HTTPS)
- Allow inbound traffic on port 22 (SSH) from your IP only
- Remove or restrict port 3000 access (only needed for testing)

## Step 6: Configure WhatsApp Webhook

### 6.1 Set Up Webhook URL
1. Go to Meta Developer Console
2. Navigate to your WhatsApp Business App
3. Set webhook URL to: `https://your-domain.com/webhook`
4. Set verify token to match your `WEBHOOK_VERIFY_TOKEN`
5. Subscribe to webhook events: `messages`

### 6.2 Test Webhook
```bash
# Test webhook verification
curl -X GET "https://your-domain.com/webhook?hub.mode=subscribe&hub.challenge=test&hub.verify_token=your_webhook_verify_token"

# Should return "test" if working correctly
```

## Step 7: Monitoring and Maintenance

### 7.1 PM2 Commands
```bash
# Check application status
pm2 status

# View logs
pm2 logs whatsapp-integration

# Restart application
pm2 restart whatsapp-integration

# Stop application
pm2 stop whatsapp-integration

# Monitor resources
pm2 monit
```

### 7.2 Docker Commands (if using Docker)
```bash
# Check container status
docker-compose -f docker-compose.prod.yml ps

# View logs
docker-compose -f docker-compose.prod.yml logs -f whatsapp-integration

# Restart containers
docker-compose -f docker-compose.prod.yml restart

# Update application
docker-compose -f docker-compose.prod.yml down
docker-compose -f docker-compose.prod.yml up -d --build
```

### 7.3 System Monitoring
```bash
# Check system resources
htop
df -h
free -h

# Check nginx logs
sudo tail -f /var/log/nginx/whatsapp.access.log
sudo tail -f /var/log/nginx/whatsapp.error.log

# Check application logs
tail -f logs/combined.log
```

## Step 8: Backup and Updates

### 8.1 Backup
```bash
# Create backup script
cat > backup.sh << 'EOF'
#!/bin/bash
DATE=$(date +%Y%m%d_%H%M%S)
BACKUP_DIR="/opt/backups"
sudo mkdir -p $BACKUP_DIR

# Backup application
sudo tar -czf $BACKUP_DIR/whatsapp-app-$DATE.tar.gz /opt/whatsapp-integration

# Backup nginx config
sudo cp /etc/nginx/nginx.conf $BACKUP_DIR/nginx-$DATE.conf

# Keep only last 7 backups
find $BACKUP_DIR -name "whatsapp-app-*.tar.gz" -mtime +7 -delete
EOF

chmod +x backup.sh

# Add to crontab for daily backups
crontab -e
# Add: 0 2 * * * /home/ec2-user/backup.sh
```

### 8.2 Updates
```bash
# For PM2 deployment
cd /opt/whatsapp-integration
git pull origin main  # or your main branch
npm install --production
npm run build
pm2 restart whatsapp-integration

# For Docker deployment
git pull origin main
docker-compose -f docker-compose.prod.yml down
docker-compose -f docker-compose.prod.yml up -d --build
```

## Troubleshooting

### Common Issues

1. **Port already in use**
   ```bash
   sudo lsof -i :3000
   sudo kill -9 <PID>
   ```

2. **Permission denied**
   ```bash
   sudo chown -R ec2-user:ec2-user /opt/whatsapp-integration
   ```

3. **SSL certificate issues**
   ```bash
   sudo certbot renew --dry-run
   sudo systemctl restart nginx
   ```

4. **Application not starting**
   ```bash
   # Check logs
   pm2 logs whatsapp-integration
   # or
   docker-compose -f docker-compose.prod.yml logs whatsapp-integration
   ```

5. **Webhook not receiving messages**
   - Check security groups
   - Verify webhook URL and verify token
   - Check nginx configuration
   - Test with curl

## Security Best Practices

1. **Keep system updated**
   ```bash
   sudo yum update -y
   ```

2. **Use strong passwords and SSH keys**
3. **Limit SSH access to your IP**
4. **Regularly rotate access tokens**
5. **Monitor logs for suspicious activity**
6. **Keep SSL certificates updated**

## Performance Optimization

1. **Enable gzip compression in Nginx**
2. **Set up CloudWatch monitoring**
3. **Use Application Load Balancer for high availability**
4. **Consider using Redis for session management**
5. **Implement proper logging and monitoring**

Your WhatsApp integration should now be running successfully on EC2! 🎉
