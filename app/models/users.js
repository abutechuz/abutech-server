const { fetch, fetchOne } = require('../library/database/postgres')

const getUsers = async ({ query : { page , limit }}) => {

  const SQL = `select * from users
  order by user_id desc
  offset ($1 - 1) * $2 fetch next $2 rows only ;`

  return await fetch(SQL, page, limit)

}

const insertUser = async ({body : { user_username , user_password }}) => {

  const SQL = `insert into users (user_username , user_password ) values ($1, crypt($2,gen_salt('bf')) ) returning *`

  return await fetchOne(SQL, user_username , user_password)

}

const setUser = async ({body : { user_password , user_username , user_id }}) => {

  const SQL = `update users set user_password=crypt($1 , gen_salt('bf')) , user_username=$2  where user_id=$3 returning *`

  return await fetchOne(SQL, user_password ,user_username, user_id )

}

const deleteUser = async ({body : { user_id }}) => {

  const SQL = `DELETE FROM users
  WHERE user_id=$1 returning *;`

  return await fetchOne(SQL, user_id )

}

module.exports = {
  getUsers,
  insertUser,
  setUser,
  deleteUser
}
