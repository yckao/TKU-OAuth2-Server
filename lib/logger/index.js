const bunyan = require('bunyan')
const config = require('config')

const logger = bunyan.createLogger({
  name: config.name,
  level: config.logLevel,
  serializers: bunyan.stdSerializers
})

module.exports = logger
