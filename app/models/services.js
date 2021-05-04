const { fetch, fetchOne } = require('../library/database/postgres')

const getServices = async (page, limit, lang) => {
  const SQL = `
    select * from get_services($1, $2, $3);
  `

  const services = await fetch(SQL, page, limit, lang)

  return services

}

const addService = async (req) => {
  const {
    image,
    uz_title,
    uz_body,
    ru_title,
    ru_body,
    en_title,
    en_body
  } = req.body

  const SQL = `
  select add_service(
    $1,

    $2, $3,

    $4, $5,

    $6, $7
  );`

  const service = await fetch(SQL, image, uz_title, uz_body, ru_title, ru_body, en_title, en_body )

  return service

}

const deleteService = async (id) => {
  const SQL = `
    delete from services where service_id = $1 returning *;
  `
  const deleted = await fetchOne(SQL, id)

  if (deleted) {
    return 1
  } else {
    return 0
  }
}


module.exports = {
  getServices,
  addService,
  deleteService
}
