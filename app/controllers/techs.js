const techsModel = require('../models/techs.js')
const { verify } = require('../library/jwt.js')

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
      const tech = await techsModel.addTechnology(req)

      res.send(tech)
    } catch (error) {
      res.send(error)
    }
  },

  DELETE: async (req, res) => {
    try {
      const tech = await techsModel.deleteTechnology(req)

      res.send(tech)

    } catch (error) {
      res.send(error)
    }
  }
}
