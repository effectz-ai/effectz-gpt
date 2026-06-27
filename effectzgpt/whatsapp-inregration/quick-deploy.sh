#!/bin/bash

# Quick deployment script for EC2
# Run this script on your EC2 instance after uploading your code

set -e

echo "🚀 Starting WhatsApp Integration Quick Deploy..."

# Check if running as root
if [ "$EUID" -eq 0 ]; then
    echo "⚠️  Please don't run this script as root. Run as ec2-user."
    exit 1
fi

# Install Node.js if not present
if ! command -v node &> /dev/null; then
    echo "📦 Installing Node.js..."
    curl -fsSL https://rpm.nodesource.com/setup_18.x | sudo bash -
    sudo yum install -y nodejs
fi

# Install PM2 if not present
if ! command -v pm2 &> /dev/null; then
    echo "📦 Installing PM2..."
    sudo npm install -g pm2
fi

# Create application directory
APP_DIR="/opt/whatsapp-integration"
if [ ! -d "$APP_DIR" ]; then
    echo "📁 Creating application directory..."
    sudo mkdir -p $APP_DIR
    sudo chown ec2-user:ec2-user $APP_DIR
fi

# Navigate to app directory
cd $APP_DIR

# Install dependencies
echo "📦 Installing dependencies..."
npm install --production

# Build application
echo "🔨 Building application..."
npm run build

# Create logs directory
mkdir -p logs

# Check if .env exists
if [ ! -f ".env" ]; then
    echo "⚠️  Creating .env file template..."
    cat > .env << EOL
WEBHOOK_VERIFY_TOKEN=your_webhook_verify_token_here
EFFECTZGPT_ENDPOINT=your_effectzgpt_endpoint_here
WHATSAPP_ACCESS_TOKEN=your_whatsapp_access_token_here
WHATSAPP_BUSINESS_ACCOUNT_ID=your_business_account_id_here
WHATSAPP_PHONE_NUMBER_ID=your_phone_number_id_here
CLOUD_API_VERSION=17.0
PORT=3000
NODE_ENV=production
EOL
    echo "📝 Please edit .env file with your actual values: nano .env"
    read -p "Press Enter after you've updated the .env file..."
fi

# Stop existing PM2 process if running
if pm2 list | grep -q "whatsapp-integration"; then
    echo "🔄 Stopping existing application..."
    pm2 delete whatsapp-integration
fi

# Start application with PM2
echo "🚀 Starting application..."
pm2 start ecosystem.config.js --env production

# Save PM2 configuration
pm2 save

# Setup PM2 startup (only if not already set up)
if ! systemctl list-unit-files | grep -q pm2-ec2-user.service; then
    echo "⚙️  Setting up PM2 startup..."
    pm2 startup
    echo "⚠️  Please run the command shown above as sudo!"
    read -p "Press Enter after running the sudo command..."
fi

echo "✅ Deployment completed!"
echo ""
echo "📊 Application Status:"
pm2 status

echo ""
echo "📝 Next Steps:"
echo "1. Configure your security group to allow HTTP (80) and HTTPS (443)"
echo "2. Set up a domain name pointing to this EC2 instance"
echo "3. Install and configure Nginx with SSL"
echo "4. Update your WhatsApp webhook URL to: https://<ngrokdomain>/webhook"
echo ""
echo "🔍 Useful Commands:"
echo "  pm2 status                 - Check application status"
echo "  pm2 logs whatsapp-integration  - View logs"
echo "  pm2 restart whatsapp-integration  - Restart application"
echo "  pm2 monit                  - Monitor resources"
echo ""
echo "🌐 Test your application:"
echo "  curl http://localhost:8080/health"
echo "  curl http://localhost:8080/"
