const { verify } = require('./jwt.js')

module.exports = ({ cookies: { token } }) => {

  return verify(token)
}