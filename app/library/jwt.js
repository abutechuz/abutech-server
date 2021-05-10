const jwt = require('jsonwebtoken')
const { JWT_KEY } = require('../../config/config.js')

const sign = (payload, option) => jwt.sign(payload, JWT_KEY, option)
const verify = (token, option) => jwt.verify(token, JWT_KEY, option)

module.exports = {
  sign,
  verify
}
