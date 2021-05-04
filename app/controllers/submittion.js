const submittionsModel = require('../models/submittion.js')
const authJWT = require('../Library/auth.js')

module.exports = {
  GET: async (req, res) => {
    try {
      authJWT(req)
      const submittions = await submittionsModel.getSubmittions(req)

      res.send(submittions)
    } catch (error) {
      console.log(error)
      res.send(error)
    }
  },

  POST: async (req, res) => {
    try {
      const submittion = await submittionsModel.insertSubmittions(req)

      res.send(submittion)
    } catch (error) {
      res.send(error)
    }
  },

  DELETE: async (req, res) => {
    try {
      authJWT(req)
      const submittion = await submittionsModel.deleteSubmittions(req)

      res.send(submittion)
    } catch (error) {
      res.send(error)
    }
  },
}
