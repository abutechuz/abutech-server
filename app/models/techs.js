const { fetch, fetchOne } = require('../library/database/postgres')

const getTechnologies = async () => {
  const SQL = `
    select * from technologies;
  `

  return await fetch(SQL)
}

const addTechnology = async (req) => {

  const { technology_name, technology_type, technology_image  } = req.body

  const SQL = `
  insert into technologies(
    technology_name,
    technology_type,
    technology_image
  ) values ($1, $2, $3) returning * ;
  `

  return await fetchOne(SQL, technology_name, technology_type, technology_image)

}

const deleteTechnology =  async ({ body: { technology_id }}) => {

  const SQL = `delete from technologies where technology_id = $1 returning *`

  return await fetchOne(SQL, technology_id)
}

  module.exports = {
    getTechnologies,
    addTechnology,
    deleteTechnology
  }

