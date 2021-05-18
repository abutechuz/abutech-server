const submittionsModel = require('../models/submittion.js')


module.exports = {
  GET: async (req, res) => {
    try {
      const submittions = await submittionsModel.getSubmittions(req)

      res.send(submittions)
    } catch (error) {
      console.log(error)
      res.send(error)
    }
  },

  POST: async (req, res) => {
    // try {

    let doc;
    let uploadPath

    // if (!req.files || Object.keys(req.files).length === 0) {
    //   return res.status(400).send('No files were uploaded.')
    // }

    var path = require('path')
    var scriptName = path.dirname(path.dirname(path.dirname(__filename)))

    doc = req.files.doc || {};
    let mimetype = doc.mimetype;
    let uuid = null;

    if (mimetype) {
      if (mimetype.match(/application\/msword/g) || mimetype.match(/application\/pdf/g) || mimetype.match(/application\/epub+zip/g) || mimetype.match(/application\/gzip/g) || mimetype.match(/application\/vnd.ms-excel/g) || mimetype.match(/application\/zip/g) || mimetype.match(/application\/x-7z-compressed/g) || mimetype.match(/application\/vnd.openxmlformats-officedocument.wordprocessingml.document/g)) {
        uuid = require("uuid").v4()

        uploadPath = scriptName + `/data/doc/${uuid}`

        doc.mv(uploadPath, function (err) {
          if (err) {
            uuid = null
            return res.status(500).send(err)
          }
        })
      }
    }


    if (/^998(9[012345789]|6[125679]|7[01234569])[0-9]{7}$/.test(req.body.submittion_phone)) {
      if (req.body.submittion_email) {
        if (/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(req.body.submittion_email)) {
          const submittion = await submittionsModel.insertSubmittions(req, uuid)

          res.send(submittion)
        } else {
          res.status(409).send({
            validation: false
          })
        }
      } else {
        req.body.submittion_email = null
        const submittion = await submittionsModel.insertSubmittions(req, uuid)

        res.send(submittion)
      }

    } else {
      res.status(409).send({
        validation: false
      })
    }
    // } catch (error) {
    //   res.send(error)
    // }
  },

  DELETE: async (req, res) => {
    try {
      const submittion = await submittionsModel.deleteSubmittions(req)

      res.send(submittion)
    } catch (error) {
      res.send(error)
    }
  },
}