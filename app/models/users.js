const { fetch, fetchOne } = require('../library/database/postgres')

const getUsers = async ({query : {page , limit}}) => {
  
  const SQL = `select * from users
  order by user_id desc
  offset ($1 - 1) * $2 fetch next $2 rows only ;`
  
  const blogs = await fetch(SQL, page, limit)
  
  return blogs
}

const insertUser = async ({body : { user_username , user_password }}) => {
  
  const SQL = `insert into users (user_username , user_password ) values ($1, crypt($2,gen_salt('bf')) ) returning *`
  
  const response = await fetchOne(SQL, user_username , user_password)
  
  return response
}

const setUser = async ({body : { user_password , user_username , user_id }}) => {
  
  const SQL = `update users set user_password=crypt($1 , gen_salt('bf')) , user_username=$2  where user_id=$3 returning *`
  
  const res = await fetchOne(SQL, user_password ,user_username, user_id )
  
  return res
}

const deleteUser = async ({body : { user_id }}) => {
  
  const SQL = `DELETE FROM users
  WHERE user_id=$1 returning *;`
  
  const user = await fetchOne(SQL, user_id )
  
  return user
}

module.exports = {
  getUsers,
  insertUser,
  setUser,
  deleteUser
}
