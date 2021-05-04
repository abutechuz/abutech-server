const { fetchOne } = require('../library/database/postgres')

const login = async (username, password) => {
  const SQL = `select * from login_user($1, $2);`

  const user = await fetchOne(SQL, username, password)

  return user
}

module.exports = login
