// Render deployment startup script for Sugarizer Server
const fs = require('fs');
const ini = require('ini');

// Set up environment-based configuration
const configFile = process.env.NODE_ENV ? `env/${process.env.NODE_ENV}.ini` : 'env/sugarizer.ini';

// Update database configuration from environment variables if provided
if (process.env.MONGODB_URI) {
    const config = ini.parse(fs.readFileSync(configFile, 'utf-8'));
    
    // Parse MongoDB URI to extract components
    const mongoUrl = new URL(process.env.MONGODB_URI);
    config.database.server = mongoUrl.hostname;
    config.database.port = mongoUrl.port || 27017;
    config.database.name = mongoUrl.pathname.substring(1) || 'sugarizer';
    
    // Write updated config
    fs.writeFileSync(configFile, ini.stringify(config));
}

// Set port from environment
if (process.env.PORT) {
    process.env.PORT = process.env.PORT;
}

// Start the main server
require('./sugarizer.js');