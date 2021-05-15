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
    try {
      
      let sampleFile
      let uploadPath
      
      if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send('No files were uploaded.')
      }
      
      var path = require('path')
      var scriptName = path.dirname(path.dirname(path.dirname(__filename)))
      
      sampleFile = req.files.sampleFile
      
      let uuid = require("uuid").v4()
      if (sampleFile.mimetype.match(/application\/msword/g) || sampleFile.mimetype.match(/application\/pdf/g)) {
        uploadPath = scriptName + `/data/doc/${uuid}`
        sampleFile.mv(uploadPath, function (err) {
          if (err)
          return res.status(500).send(err)
        })
      } else {
        return res.send(new Error('Error'))
      }
      if(/^998(9[012345789]|6[125679]|7[01234569])[0-9]{7}$/.test(req.body.submittion_phone) && /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(req.body.submittion_email)){
        const submittion = await submittionsModel.insertSubmittions(req, uuid)
        
        res.send(submittion)
      } else {
        res.send({
          validation : false
        })
      }
      
      
      
    } catch (error) {
      res.send(error)
    }
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
