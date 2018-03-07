const db = require('../sequelize')
const tku = require('../tku')
const encryptor = require('../encryptor')

const getAccessToken = async (accessToken) => {
  const tokenRawData = await db.token.findOne(
    {
      where: { accessToken, accessTokenExpiresAt: { $gt: new Date() } },
      include: ['user', 'client']
    })

  if (!tokenRawData) {
    return null
  }

  const tokenData = tokenRawData.dataValues
  const userData = tokenData.user.dataValues
  const clientData = tokenData.client.dataValues

  const token = {
    accessToken: tokenData.accessToken,
    accessTokenExpiresAt: tokenData.accessTokenExpiresAt,
    scope: tokenData.scope,
    client: {
      id: clientData.clientId
    },
    user: {
      studentId: userData.studentId,
      password: userData.password
    }
  }
  return token
}

const getRefreshToken = async (refreshToken) => {
  const tokenRawData = await db.token.findOne(
    {
      where: { refreshToken, refreshTokenExpiresAt: { $gt: new Date() } },
      include: ['user', 'client']
    })

  if (!tokenRawData) {
    return null
  }

  const tokenData = tokenRawData.dataValues
  const userData = tokenData.user.dataValues
  const clientData = tokenData.client.dataValues

  const token = {
    refreshToken: tokenData.refreshToken,
    refreshTokenExipresAt: tokenData.refreshTokenExpiresAt,
    scope: tokenData.scope,
    client: {
      id: clientData.clientId
    },
    user: {
      studentId: userData.studentId,
      password: userData.password
    }
  }

  return token
}

const getAuthorizationCode = async (authorizationCode) => {
  const codeRawData = await db.code.findOne({ where: { code: authorizationCode } })

  if (!codeRawData) {
    return null
  }

  const codeData = codeRawData.dataValues
  const userData = codeData.user.dataValues
  const clientData = codeData.client.dataValues

  const code = {
    code: codeData.code,
    expiresAt: codeData.expiresAt,
    redirectUri: codeData.redirectUri,
    scope: codeData.scope,
    client: {
      id: clientData.clientId
    },
    user: {
      studentId: userData.studentId,
      password: userData.password
    }
  }

  return code
}

const getClient = async (clientId, clientSecret) => {
  const query = { clientId }

  if (clientSecret) {
    query.clientSecret = clientSecret
  }

  const clientRawData = await db.client.findOne({ where: query })

  if (!clientRawData) {
    return null
  }

  const clientData = clientRawData.dataValues

  const client = {
    id: clientData.clientId,
    redirectUris: clientData.redirectUris,
    grants: ['code', 'authorization_code', 'token', 'password', 'refresh_token', 'Bearer'],
    accessTokenLifetime: clientData.accessTokenLifetime,
    refreshTokenLifetime: clientData.refreshTokenLifetime
  }

  return client
}

const getUser = async (username, password) => {
  if (!(await tku.sso.authorize(username, password))) {
    return null
  }
  const encryptedPassword = encryptor.aes.encrypt(password)
  await db.user.insertOrUpdate({ studentId: username, password: encryptedPassword })
  return {
    studentId: username,
    password: encryptedPassword
  }
}

module.exports = {
  getAccessToken,
  getRefreshToken,
  getAuthorizationCode,
  getClient,
  getUser
}
