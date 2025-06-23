// Load environment variables first
import 'dotenv/config';
import path from 'path';

// Also try to load from specific path in case dotenv/config doesn't work
import * as dotenv from 'dotenv';

// Load .env file from multiple possible locations - OVERRIDE existing env vars
const possibleEnvPaths = [
  path.resolve(process.cwd(), '.env'),                    // From current working directory
  path.resolve(__dirname, '..', '..', '.env'),          // From built JS file location (build/config/index.js -> ../../.env)
  path.resolve(__dirname, '..', '.env'),                 // From src directory
];

let envLoaded = false;
for (const envPath of possibleEnvPaths) {
  const fs = require('fs');
  if (fs.existsSync(envPath)) {
    console.log('✅ Found .env file at:', envPath);
    // Use override: true to override existing environment variables
    dotenv.config({ path: envPath, override: true });
    envLoaded = true;
    break;
  }
}

if (!envLoaded) {
  console.log('� Searched for .env file in:');
  possibleEnvPaths.forEach(p => console.log(`   - ${p}`));
}

// Debug: Check environment variables
console.log('🔧 Environment variables status:');
console.log('   - WEBHOOK_VERIFY_TOKEN:', process.env.WEBHOOK_VERIFY_TOKEN ? '✅ SET' : '❌ NOT SET');
console.log('   - WHATSAPP_ACCESS_TOKEN:', process.env.WHATSAPP_ACCESS_TOKEN ? '✅ SET' : '❌ NOT SET');
console.log('   - WHATSAPP_PHONE_NUMBER_ID:', process.env.WHATSAPP_PHONE_NUMBER_ID ? '✅ SET' : '❌ NOT SET');

// Debug: Show actual values (first 20 chars for security)
console.log('🔍 Debug - Actual values:');
console.log('   - WEBHOOK_VERIFY_TOKEN:', process.env.WEBHOOK_VERIFY_TOKEN?.substring(0, 20) + '...' || 'undefined');
console.log('   - WHATSAPP_ACCESS_TOKEN:', process.env.WHATSAPP_ACCESS_TOKEN?.substring(0, 20) + '...' || 'undefined');
console.log('   - WHATSAPP_PHONE_NUMBER_ID:', process.env.WHATSAPP_PHONE_NUMBER_ID?.substring(0, 20) + '...' || 'undefined');

// Debug: Check if variables have weird characters
console.log('🔍 Debug - Variable lengths:');
console.log('   - WEBHOOK_VERIFY_TOKEN length:', process.env.WEBHOOK_VERIFY_TOKEN?.length || 0);
console.log('   - WHATSAPP_ACCESS_TOKEN length:', process.env.WHATSAPP_ACCESS_TOKEN?.length || 0);
console.log('   - WHATSAPP_PHONE_NUMBER_ID length:', process.env.WHATSAPP_PHONE_NUMBER_ID?.length || 0);

interface Config {
  PORT: number;
  NODE_ENV: string;
  WEBHOOK_VERIFY_TOKEN: string;
  WHATSAPP_ACCESS_TOKEN: string;
  WHATSAPP_PHONE_NUMBER_ID: string;
  WHATSAPP_BUSINESS_ACCOUNT_ID?: string;
  EFFECTZGPT_ENDPOINT?: string;
  CLOUD_API_VERSION: string;
}

// Validate required environment variables
function validateEnvVars(): Config {
  const requiredVars = [
    'WEBHOOK_VERIFY_TOKEN',
    'WHATSAPP_ACCESS_TOKEN',
    'WHATSAPP_PHONE_NUMBER_ID'
  ];

  const missingVars = requiredVars.filter(varName => !process.env[varName]);
  
  if (missingVars.length > 0) {
    console.error('❌ Missing required environment variables:');
    missingVars.forEach(varName => {
      console.error(`   - ${varName}`);
    });
    console.error('\n💡 Please create a .env file based on .env.example and fill in the required values.');
    process.exit(1);
  }

  console.log('✅ Environment variables validated successfully');

  return {
    PORT: parseInt(process.env.PORT || '8080', 10),
    NODE_ENV: process.env.NODE_ENV || 'development',
    WEBHOOK_VERIFY_TOKEN: process.env.WEBHOOK_VERIFY_TOKEN!,
    WHATSAPP_ACCESS_TOKEN: process.env.WHATSAPP_ACCESS_TOKEN!,
    WHATSAPP_PHONE_NUMBER_ID: process.env.WHATSAPP_PHONE_NUMBER_ID!,
    WHATSAPP_BUSINESS_ACCOUNT_ID: process.env.WHATSAPP_BUSINESS_ACCOUNT_ID,
    EFFECTZGPT_ENDPOINT: process.env.EFFECTZGPT_ENDPOINT,
    CLOUD_API_VERSION: process.env.CLOUD_API_VERSION || '22.0'
  };
}

export const config = validateEnvVars();
