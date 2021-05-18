const {
  verify
} = require('../library/jwt.js')

module.exports = {
  GET: async function (req, res) {
    var uploadPath
    var path = require('path')
    var scriptName = path.dirname(path.dirname(path.dirname(__filename)))

    uploadPath = scriptName + '/data/doc/brief.pdf'
    try {
      res.download(uploadPath)
    } catch (error) {
      res.send(error)
    }
  },

  GETBYID: async function ({
    params: {
      id
    }
  }, res) {
    var uploadPath
    var path = require('path')
    var readF = require('util').promisify(require("fs").readFile)
    var scriptName = path.dirname(path.dirname(path.dirname(__filename)))

    uploadPath = scriptName + `/data/doc/${id}`
    const fs = require('fs')

    fs.readFile(uploadPath, 'utf8', (err, data) => {
      if (err) {
        return res.send(err)
      } else {
        return res.download(uploadPath)
      }
    })

  },

  POST: async function (req, res) {
    let sampleFile
    let uploadPath

    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).send('No files were uploaded.')
    }

    var path = require('path')
    var scriptName = path.dirname(path.dirname(path.dirname(__filename)))

    sampleFile = req.files.sampleFile

    if (sampleFile.mimetype.match(/application\/msword/g) || sampleFile.mimetype.match(/application\/pdf/g)) {
      uploadPath = scriptName + `/data/doc/brief.pdf`
      sampleFile.mv(uploadPath, function (err) {
        if (err)
          return res.status(500).send(err)
      })

      res.send(uploadPath)
    } else {
      res.send(new Error('Error'))
    }
  },
}