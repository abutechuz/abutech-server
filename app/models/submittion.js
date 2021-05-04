const { fetch, fetchOne } = require('../library/database/postgres')

const getSubmittions = async ({query : {page , limit}}) => {
  
  const SQL = `select * from submittions where submittion_active=true
  order by submittion_id desc
  offset ($1 - 1) * $2 fetch next $2 rows only ;`
  
  const subs = await fetch(SQL, page, limit)
  
  return subs
}

const insertSubmittions = async ({body : {
  submittion_fullname,
  submittion_message,
  submittion_phone,
  submittion_email,
  submittion_companyname
}}) => {
  
  const SQL = `insert into submittions ( submittion_fullname,submittion_message ,submittion_phone,submittion_email,submittion_companyname) values($1,$2,$3,$4,$5) returning *`
  
  const subs = await fetch(SQL,  
    submittion_fullname,
    submittion_message ,
    submittion_phone,
    submittion_email ?? null,
    submittion_companyname ?? null
    )
    
    return subs
  }

  const deleteSubmittions = async ({body : {submittion_id}}) => {
  
    const SQL = `UPDATE submittions
    SET submittion_active=false
    WHERE submittion_id=$1 returning * ;`
    
    const subs = await fetchOne(SQL, submittion_id)
    
    return subs
  }
  
  module.exports = {
    getSubmittions,
    insertSubmittions,
    deleteSubmittions
  }
  