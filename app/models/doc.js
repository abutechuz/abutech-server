const path = require('path')
const { fetch, fetchOne } = require('../library/database/postgres')

const getDocs = async ({
  body : {
    page, limit , lang
  }
}) => {
  var uploadPath ;
  var path = require('path');
  var scriptName = path.dirname(path.dirname(path.dirname(__filename)));

  uploadPath = scriptName + '/data/doc/brief';
  try {
    const docs = await fetch(SQL,page , limit)
    return docs
  } catch (error) {
    return error
  }
}

const addDoc = async ( req , doc_name ) => {
  const {
    service_id
  } = req.body
  
  const SQL = `
  insert into docs(
    doc_src,
    service_id
    )
    values ($1,$2) returning * ;
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
    
    var converter = require('office-converter')();
    
    // try {
    const {doc_src}=    await  fetchOne(`select * from docs where doc_id=$1` , doc_id_array)
    var scriptName = path.join(path.dirname(path.dirname(path.dirname(__filename))) , "/data/doc/" , doc_src.toString());
    
    var toPdf = require("office-to-pdf")
    var fs = require("fs")
    toPdf(scriptName).then(
      (pdfBuffer) => {
        fs.writeFileSync("../../data/doc/", pdfBuffer)
      }, (err) => {
        console.log(err)
      }
      )
      
      
      // const deletedDoc = scriptName
      return scriptName
      // } catch (error) {
      //   return error
      // }
    }
    
    
    
    module.exports = {
      getDocs,
      addDoc,
      downloadDocs,
      deleteDoc
    }
    
    