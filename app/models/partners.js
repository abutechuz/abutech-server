const { fetch, fetchOne } = require('../library/database/postgres')

const getPartners = async ({query : {page , limit}}) => {

  const SQL = `select * from partners
  order by partner_id desc
  offset ($1 - 1) * $2 fetch next $2 rows only ;`

  const partners = await fetch(SQL, page, limit)

  return partners
}

const insertPartners = async ({body : { partner_link, partner_title, partner_img }}) => {
  const SQL = `insert into partners (partner_link, partner_title, partner_img) values ($1,$2,$3) returning *`
  const response = await fetchOne(SQL,  partner_link, partner_title, partner_img )

  return response
}

const setPartner = async ({body : {  partner_link, partner_title, partner_img,partner_id  }}) => {
  const SQL = `update partners set  partner_link=$1, partner_title=$2, partner_img=$3 where partner_id=$4 returning *`
  const res = await fetchOne(SQL, partner_link, partner_title, partner_img,partner_id)

  return res
}

const deletePartner = async ({body : { partner_id }}) => {
  const SQL = `DELETE FROM partners WHERE partner_id=$1 returning *;`

  return await fetchOne(SQL, partner_id)
}

module.exports = {
  getPartners,
  insertPartners,
  setPartner,
  deletePartner
}
