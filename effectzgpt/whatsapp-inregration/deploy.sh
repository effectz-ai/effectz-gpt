#!/bin/bash

# WhatsApp Integration Deployment Script for EC2
# This script sets up the application on a fresh EC2 instance

set -e

echo "🚀 Starting WhatsApp Integration Deployment..."

# Update system packages
echo "📦 Updating system packages..."
sudo yum update -y

# Install Node.js (using NodeSource repository for latest LTS)
echo "📦 Installing Node.js..."
curl -fsSL https://rpm.nodesource.com/setup_lts.x | sudo bash -
sudo yum install -y nodejs

# Install PM2 globally for process management
echo "📦 Installing PM2..."
sudo npm install -g pm2

# Install Git if not present
echo "📦 Installing Git..."
sudo yum install -y git

# Create application directory
echo "📁 Creating application directory..."
sudo mkdir -p /opt/whatsapp-integration
sudo chown ec2-user:ec2-user /opt/whatsapp-integration
cd /opt/whatsapp-integration

# Clone repository (you'll need to replace with your actual repo URL)
echo "📥 Cloning repository..."
# git clone https://github.com/your-username/your-repo.git .
# For now, we'll assume code is already uploaded

# Install dependencies
echo "📦 Installing Node.js dependencies..."
npm install --production

# Build the application
echo "🔨 Building application..."
npm run build

# Create .env file with environment variables
echo "⚙️ Setting up environment variables..."
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

echo "⚠️  Please edit /opt/whatsapp-integration/.env with your actual environment variables!"

# Start application with PM2
echo "🚀 Starting application with PM2..."
pm2 start ecosystem.config.js --env production

# Save PM2 configuration and setup startup script
echo "💾 Saving PM2 configuration..."
pm2 save
pm2 startup

echo "✅ Deployment completed!"
echo "📝 Next steps:"
echo "1. Edit /opt/whatsapp-integration/.env with your actual environment variables"
echo "2. Run: pm2 restart whatsapp-integration"
echo "3. Configure your webhook URL in Meta Developer Console to: https://your-domain.com/webhook"
echo "4. Test your webhook endpoint"
