const db = require('../sequelize')

const revokeToken = async (token) => {
  return (await db.token.destroy({ where: { refreshToken: token.refreshToken } })) === 1
}

const revokeAuthorizationCode = async (code) => {
  await db.code.destroy({ where: { code: code.code } })
}

module.exports = {
  revokeToken,
  revokeAuthorizationCode
}
