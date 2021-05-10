const { verify } = require('./jwt.js')
const { fetchOne } = require('../library/database/postgres.js')

module.exports = async ({ cookies: { token } }) => {
  return verify(token)
  // const { user_id } = await verify(token)
  // const SQL = `select user_id, user_username from users where user_id = $1`

  // const user = await fetchOne(SQL, user_id)

  // if (!user) {
  //   return true
  // } else {
  //   return false
  // }
}
