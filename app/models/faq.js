const { fetch, fetchOne } = require('../library/database/postgres.js')

const getFaq = async (req) => {
  const SQL = `select * from faq`

  return await fetch(SQL)
}

const addFaq = async ({ body: { faq_question_uz,
  faq_answer_uz,
  faq_question_ru,
  faq_answer_ru,
  faq_question_en,
  faq_answer_en
 } }) => {
  const SQL = `insert into faq(
    faq_question_uz,
    faq_answer_uz,
    faq_question_ru,
    faq_answer_ru,
    faq_question_en,
    faq_answer_en
  ) values ($1, $2 , $3 , $4 ,$5 , $6) returning *;`

  return await fetchOne(SQL, faq_question_uz,
    faq_answer_uz,
    faq_question_ru,
    faq_answer_ru,
    faq_question_en,
    faq_answer_en)
}

const deleteFaq = async ({body : faq_id}) => {
  const SQL = `delete from faq where faq_id=$1`

  return await fetch(SQL , faq_id)
}

module.exports = {
  getFaq,
  addFaq,
  deleteFaq
}
