const db = require('../sequelize')

const revokeToken = async (token) => {
  await db.token.destroy({ where: { accessToken: token.accessToken } })
}

const revokeAuthorizationCode = async (code) => {
  await db.code.destroy({ where: { code: code.code } })
}

module.exports = {
  revokeToken,
  revokeAuthorizationCode
}
