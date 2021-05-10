const { fetch, fetchOne } = require('../library/database/postgres')

const getTechnologies = async () => {
  const SQL = `
    select * from technologies;
  `

  const techs = await fetch(SQL)

  return techs
}

const addTechnology = async (req) => {

  const {
    technology_name,
    technology_type,
    technology_image
  } = req.body

  const SQL = `
  insert into technologies(
    technology_name,
    technology_type,
    technology_image
  ) values ($1, $2, $3) returning * ;
  `

  const tech = await fetchOne(SQL, technology_name, technology_type, technology_image)

  return tech
}

  module.exports = {
    getTechnologies,
    addTechnology
  }

