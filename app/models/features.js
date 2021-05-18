const { fetch, fetchOne } = require('../library/database/postgres')

const getFeatures = async (page, limit, lang) => {
  const SQL = `
    select
      *
    from get_feature($1, $2, $3);
  `

  return await fetch(SQL, page, limit, lang)
}

const addFeature = async (req) => {
  const {
    image,
    project_id,
    uz_title,
    uz_desc,
    ru_title,
    ru_desc,
    en_title,
    en_desc
  } = req.body

  const SQL = `
  select add_feature(
    $1, $2

    $3, $4,

    $5, $6,

    $7, $8
  );`

  return await fetch(SQL,   image,
    project_id,
    uz_title,
    uz_desc,
    ru_title,
    ru_desc,
    en_title,
    en_desc)

}

const deleteFeature = async (id) => {
  const SQL = `
    delete from features where feature_id = $1 returning *;
  `

  return await fetchOne(SQL, id)
}


module.exports = {
  getFeatures,
  addFeature,
  deleteFeature
}
