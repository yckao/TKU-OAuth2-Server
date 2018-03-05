const db = require('../sequelize')

const saveToken = async (token, client, user) => {
  const clientId = (await db.client.findOne({ clientId: client.id })).dataValues.id
  const userId = (await db.user.findOne({ studentId: user.studentId })).dataValues.id
  await db.token.insertOrUpdate(Object.assign(token, { clientId, userId }))

  return Object.assign(token, {
    client,
    user
  })
}

const saveAuthorizationCode = async (code, client, user) => {
  const clientId = (await db.client.findOne({ clientId: client.id })).dataValues.id
  const userId = (await db.user.findOne({ studentId: user.studentId })).dataValues.id

  await db.code.insertOrUpdate(Object.assign(code, { clientId, userId }))

  return Object.assign(code, {
    client,
    user
  })
}

module.exports = {
  saveToken,
  saveAuthorizationCode
}
