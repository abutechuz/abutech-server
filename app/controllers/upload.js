const fs = require('fs')
const path = require('path')

module.exports = {
  GET : function (req, res) {
    const folderImg = path.dirname(path.dirname(path.dirname(__filename))) + "/data/img"

    const folderVideo= path.dirname(path.dirname(path.dirname(__filename))) + "/data/video"


    try {
      res.send([...fs.readdirSync(folderImg).map(el => {
       return {
        type : "img" ,
        src : el
       }
      }), ...fs.readdirSync(folderVideo).map(el => {
        return {
         type : "video" ,
         src : el
        }
       })])
    } catch (error) {
      res.send(error)
    }
  },

  POST: function (req, res) {

    let sampleFile
    let uploadPath

    const { v4: uuidv4 } = require('uuid')

    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).send('No files were uploaded.')
    }

    // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file

    var scriptName = path.dirname(path.dirname(path.dirname(__filename)))

    sampleFile = req.files.sampleFile
    let Sources = []
    if (sampleFile.length > 1 && sampleFile) {
      sampleFile.map(obj => {
        if (obj.mimetype.match(/image/g)) {
          let val = uuidv4()
          uploadPath = scriptName + '/data/img/' + val
          obj.mv(uploadPath, function (err) {
            if (err)
            return res.status(500).send(err)
          })
          Sources.push(val)
        } else if (obj.mimetype.match(/video/g)) {
          let val = uuidv4()
          uploadPath = scriptName + '/data/video/' + val
          obj.mv(uploadPath, function (err) {
            if (err)
            return res.status(500).send(err)
          })
          Sources.push(val)
        }
      })
    } else {
      if (sampleFile.mimetype.match(/image/g)) {
        let val = uuidv4()
        uploadPath = scriptName + '/data/img/' + val
        sampleFile.mv(uploadPath, function (err) {
          if (err)
          return res.status(500).send(err)
        })
        Sources.push(val)
      } else if (sampleFile.mimetype.match(/video/g)){
        let val = uuidv4()
        uploadPath = scriptName + '/data/video/' + val
        sampleFile.mv(uploadPath, function (err) {
          if (err)
          return res.status(500).send(err)
        })
        Sources.push(val)
      }
    }

    res.send(Sources)
  }
}
