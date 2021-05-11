const auth = async ({ cookies: { token } }, res, next) => {
  const { verify } = require('./jwt.js')
  const { fetchOne } = require('./database/postgres.js')
  const SQL = `select user_id from users where user_id = $1`

  try {
    const user = await verify(token)
    const { user_id } = await fetchOne(SQL, user.user_id)

    if (user_id > 0) {
      next()
    } else {
      res.status(403).end()
    }

  } catch (error) {
    next(error)
  }
}

module.exports = auth

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
