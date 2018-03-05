const randomize = require('randomatic')

const generateAccessToken = async (client, user, scope) => {
  return `TKUat${randomize('Aa0', 36)}`
}

const generateRefreshToken = async (client, user, scope) => {
  return `TKUrt${randomize('Aa0', 36)}`
}

const generateAuthorizationCode = async (client, user, scope) => {
  return `TKUac${randomize('Aa0', 36)}`
}

module.exports = {
  generateAccessToken,
  generateRefreshToken,
  generateAuthorizationCode
}
