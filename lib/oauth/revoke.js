const db = require('../sequelize')

const revokeToken = async (token) => {
  return (await db.token.destroy({ where: { refreshToken: token.refreshToken } })) === 1
}

const revokeAuthorizationCode = async (code) => {
  return (await db.code.destroy({ where: { code: code.code } })) === 1
}

module.exports = {
  revokeToken,
  revokeAuthorizationCode
}
