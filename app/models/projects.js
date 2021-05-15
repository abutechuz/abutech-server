const { fetch, fetchOne } = require('../library/database/postgres')

const getProjects = async ({query : {page , limit}}) => {

  const SQL = `select * from projects
  where project_visible=true
  order by project_id desc
  offset ($1 - 1) * $2 fetch next $2 rows only ;`

  return await fetch(SQL, page, limit)
}

const insertProject = async ({body : {
    project_title,
    project_link,
    project_image,
    project_type,
    project_techs
  }}) => {

  const SQL = `insert into projects (project_title , project_link , project_image , project_type ,project_techs ) values ($1, $2 , $3 , $4 , $5) returning *`

  return await fetchOne(SQL, project_title , project_link , project_image , project_type ,project_techs )
}

const setProject = async ({body : { project_title , project_link , project_image , project_type ,project_techs , project_id }}) => {

  const SQL = `update projects set project_title=$1 , project_link=$2 , project_image=$3 , project_type=$4 , project_techs=$5 where project_id=$6 returning *`

  return await fetchOne(SQL, project_title , project_link , project_image , project_type ,project_techs,project_id )
}

const deleteProject = async ({ body : { project_id }}) => {
  const SQL = `update projects set project_visible=false where project_id=$1 returning *`

  return await fetchOne(SQL , project_id)

}


module.exports = {
  getProjects,
  insertProject,
  setProject,
  deleteProject
}
