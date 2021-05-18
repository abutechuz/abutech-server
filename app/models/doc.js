const path = require('path')
const { fetch, fetchOne } = require('../library/database/postgres')

const getDocs = async ({ body : { page, limit , lang }}) => {
  const scriptName = path.dirname(path.dirname(path.dirname(__filename)));
  const path = require('path')
  let uploadPath

  uploadPath = scriptName + '/data/doc/brief';
  try {
    const docs = await fetch(SQL, page, limit)

    return docs
  } catch (error) {

    return error
  }
}

const addDoc = async ( req , doc_name ) => {
  const { service_id } = req.body

  const SQL = `
  insert into docs(
    doc_src,
    service_id
  )
    values ($1,$2) returning *
    ;
  `

  try {
    const doc = await fetchOne(SQL, doc_name , service_id)

    return doc
  } catch (error) {

    return error
  }
}

const deleteDoc = async (req) => {
  const { doc_id } = req.body

  const SQL = `
  delete from docs where doc_id = $1 returning *;
  `

  try {
    const deletedDoc = await fetchOne(SQL, doc_id)

    return deletedDoc
  } catch (error) {

    return error
  }
}

const downloadDocs = async (req) => {
  const { doc_id_array } = req.body

  const { doc_src } = await fetchOne(`select * from docs where doc_id=$1`, doc_id_array)

  const scriptName = path.join(path.dirname(path.dirname(path.dirname(__filename))) , "/data/doc/" , doc_src.toString())

  const toPdf = require("office-to-pdf")
  const fs = require("fs")

  toPdf(scriptName).then((pdfBuffer) => fs.writeFileSync("../../data/doc/", pdfBuffer), (err) => console.log(err))


  return scriptName
}

module.exports = {
  getDocs,
  addDoc,
  downloadDocs,
  deleteDoc
}

