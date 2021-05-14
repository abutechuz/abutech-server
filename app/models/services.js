const { fetch, fetchOne } = require('../library/database/postgres')

const getServices = async (page, limit, lang) => {
  const SQL = `
    select
      *
    from get_services($1, $2, $3);
  `

  return await fetch(SQL, page, limit, lang)
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

  return await fetch(SQL, image, uz_title, uz_body, ru_title, ru_body, en_title, en_body)

}

const deleteService = async (id) => {
  const SQL = `
    delete from services where service_id = $1 returning *;
  `

  return await fetchOne(SQL, id)
}


module.exports = {
  getServices,
  addService,
  deleteService
}
