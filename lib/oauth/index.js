const OAuth2Server = require('oauth2-server')

const generate = require('./generate')
const get = require('./get')
const save = require('./save')
const revoke = require('./revoke')
const scope = require('./scope')

module.exports = new OAuth2Server({
  model: Object.assign({}, generate, get, save, revoke, scope)
})
