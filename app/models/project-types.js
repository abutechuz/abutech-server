const { fetch, fetchOne } = require('../library/database/postgres')

const getProjectTypes = async ({ query : { page , limit } }) => {
  const SQL = `select * from project_types
  order by project_type_id desc
  offset ($1 - 1) * $2 fetch next $2 rows only ;`

  return await fetch(SQL, page, limit)
}

const insertProjectType = async ({body : { project_type_name }}) => {

  const SQL = `insert into project_types (project_type_name) values ($1) returning *`

  const response = await fetchOne(SQL, project_type_name)

  return response
}

const setProjectType = async ({ body : { project_type_name , project_type_id } }) => {
  const SQL = `update project_types set project_type_name=$1 where project_type_id=$2 returning *`

  return await fetchOne(SQL, project_type_name , project_type_id )
}


module.exports = {
  getProjectTypes,
  insertProjectType,
  setProjectType
}
