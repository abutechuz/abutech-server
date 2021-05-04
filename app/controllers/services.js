const servicesModel = require('../models/services.js')
const authJWT = require('../library/auth.js')

module.exports = {
  GET: async (req, res) => {
    try {
      const { page = 1, limit = 4, lang = 'uz' } = req.query

      const services = await servicesModel.getServices(page, limit, lang)

      res.send(services)

    } catch (error) {
      res.send(error)
    }
  },

  POST: async (req, res) => {
    try {

      const services = await servicesModel.addService(req)

      res.send(services)

    } catch (error) {
      res.send(error)
    }
  },

  DELETE: async (req, res) => {
    try {
      const { id } = req.body

      const deletedService = await servicesModel.deleteService(id)

      res.send({deletedService})

    } catch (error) {
      res.send(error)
    }
  }
}
