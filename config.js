/**
 * Configuration variables. These can be overridden in the per-system config file 
 */

var log = require('winston');

var settings = {
  // Port that the web server will bind to
  web_port: process.env.PORT || 37760,
  
  // Database settings
  db_user: 'echo',
  db_pass: 'E842SrA3CR6B6nFt',
  db_database: 'echoprint',
  db_host: 'echoprint-server.ccw7gepbnf4c.us-east-1.rds.amazonaws.com',
  
  // Set this to a system username to drop root privileges
  run_as_user: '',
  
  // Filename to log to
  log_path: __dirname + '/logs/echoprint.log',
  // Log level. Valid values are debug, info, warn, error
  log_level: 'debug',
  
  // Minimum number of codes that must be matched to consider a fingerprint
  // match valid
  code_threshold: 10,
  
  // Supported version of echoprint-codegen codes
  codever: '4.12'
};

// Override default settings with any local settings
try {
  var localSettings = require('./config.local');
  
  for (var property in localSettings) {
    if (localSettings.hasOwnProperty(property))
      settings[property] = localSettings[property];
  }
  
  log.info('Loaded settings from config.local.js. Database is ' +
    settings.db_database + '@' + settings.db_host);
} catch (err) {
  log.warn('Using default settings from config.js. Database is ' +
    settings.db_database + '@' + settings.db_host);
}

module.exports = settings;
