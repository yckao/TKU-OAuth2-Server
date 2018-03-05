const _ = require('lodash')
const postgres = require('./postgres.js')

const env = process.env.NODE_ENV || 'development'
const port = +process.env.SERVER_PORT || 3000
const host = process.env.SERVER_HOST || '0.0.0.0'
const config = {
  port,
  host,
  name: 'TKU-OAuth2-Server',
  logLevel: process.env.LOG_LEVEL || 'info',
  postgres: postgres.postgres,
  aesKey: process.env.AES_KEY
}

// Load config file
try {
  _.merge(config, require('./' + env))
} catch (err) {
  console.log('Failed to load config:', env)
}

module.exports = config
