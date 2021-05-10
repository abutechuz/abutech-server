const techsModel = require('../models/techs.js')
const authJWT = require('../library/auth.js')

module.exports = {
  GET: async (req, res) => {
    try {
      const techs = await techsModel.getTechnologies()

      res.send(techs)

    } catch (error) {
      console.log(error)
      res.send(error)
    }
  },

  POST: async (req, res) => {
    try {
      authJWT(req)
      const tech = await techsModel.addTechnology(req)

      res.send(tech)
    } catch (error) {
      res.send(error)
    }
  }
}
