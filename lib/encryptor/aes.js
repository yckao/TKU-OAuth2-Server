const crypto = require('crypto')
const ALGORITHM = 'AES-256-CTR'
const KEY = require('../../config').aesKey

const encrypt = (text) => {
  const IV = Buffer.from(crypto.randomBytes(16))
  const encryptor = crypto.createCipheriv(ALGORITHM, KEY, IV)
  const cipherText = encryptor.update(text, 'utf-8', 'hex')

  return `${cipherText}${encryptor.final('hex')}$${IV.toString('hex')}`
}

const decrypt = (text) => {
  const [cipherText, IV] = text.split('$')

  const decryptor = crypto.createDecipheriv(ALGORITHM, KEY, Buffer.from(IV, 'hex'))
  let decryptedText = decryptor.update(cipherText, 'hex', 'utf8')

  return `${decryptedText}${decryptor.final('utf-8')}`
}

module.exports = {
  encrypt,
  decrypt
}
