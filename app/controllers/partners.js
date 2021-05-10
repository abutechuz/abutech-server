const partnersModel = require('../models/partners.js')
const { verify } = require('../library/jwt.js')

module.exports = {
  GET: async (req, res) => {
    try {
      const parners = await partnersModel.getPartners(req)

      res.send(parners)
    } catch (error) {
      console.log(error)
      res.send(error)
    }
  },
  POST: async (req, res) => {
    try {
      verify(req.cookies.token)
      const blogs = await partnersModel.insertPartners(req)

      res.send(blogs)
    } catch (error) {
      res.send(error)
    }
  },
  PUT: async (req, res) => {
    try {
      verify(req.cookies.token)
      const returning = await partnersModel.setPartner(req)

      res.send(returning)
    } catch (error) {
      res.send(error)
    }
  },
  DELETE: async (req, res) => {
    try {
      verify(req.cookies.token)
      const blog = await partnersModel.deletePartner(req)

      res.send(blog)
    } catch (error) {
      res.send(error)
    }
  },
}
