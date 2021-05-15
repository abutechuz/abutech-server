const { fetch, fetchOne } = require('../library/database/postgres')


const getSubmittions = async ({ query : { page , limit }}) => {

  const SQL = `select * from submittions where submittion_active=true
  order by submittion_id desc
  offset ($1 - 1) * $2 fetch next $2 rows only ;`

  return await fetch(SQL, page, limit)

}

const insertSubmittions = async ({body : {
  submittion_fullname,
  submittion_message,
  submittion_phone,
  submittion_email,
  submittion_companyname
}}, submittion_brief) => {


  const SQL = `insert into submittions ( submittion_fullname,submittion_message ,submittion_phone,submittion_email,submittion_companyname,submittion_brief) values($1,$2,$3,$4,$5,$6) returning *`

  try {
    return await fetchOne(SQL,
      submittion_fullname,
      submittion_message ,
      submittion_phone,
      submittion_email ?? null,
      submittion_companyname ?? null,
      submittion_brief
    )
    } catch (error) {

      return error
    }
  }

  const deleteSubmittions = async ({body : {submittion_id}}) => {

    const SQL = `UPDATE submittions
    SET submittion_active=false
    WHERE submittion_id=$1 returning * ;`

    return await fetchOne(SQL, submittion_id)

  }

  module.exports = {
    getSubmittions,
    insertSubmittions,
    deleteSubmittions
  }
