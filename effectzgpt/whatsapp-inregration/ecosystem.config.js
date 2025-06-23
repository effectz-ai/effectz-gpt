module.exports = {
  apps: [{
    name: 'whatsapp-integration',
    script: './build/index.js',
    instances: 1,
    exec_mode: 'cluster',
    env: {
      NODE_ENV: 'development',
      PORT: 8080
    },
    env_production: {
      NODE_ENV: 'production',
      PORT: 8080
    },
    // Restart settings
    max_memory_restart: '1G',
    restart_delay: 5000,
    max_restarts: 5,
    
    // Logging
    log_file: './logs/combined.log',
    out_file: './logs/out.log',
    error_file: './logs/error.log',
    log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
    
    // Health monitoring
    health_check_grace_period: 5000,
    health_check_fatal_exceptions: true,
    
    // Auto restart on file changes in development
    watch: false,
    ignore_watch: ['node_modules', 'logs', 'build']
  }]
};
