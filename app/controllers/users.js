const usersModel = require('../models/users.js')
const authJWT = require('../library/auth.js')
const auth = require('../library/auth.js')

module.exports = {
  GET: async (req, res) => {
    try {
      authJWT(req)
      const blogs = await usersModel.getUsers(req)

      res.send(blogs)
    } catch (error) {
      console.log(error)
      res.send(error)
    }
  },
  POST: async (req, res) => {
    try {
      authJWT(req)
      const blogs = await usersModel.insertUser(req)

      res.send(blogs)
    } catch (error) {
      res.send(error)
    }
  },
  PUT: async (req, res) => {
    try {
      authJWT(req)
      const returning = await usersModel.setUser(req)

      res.send(returning)
    } catch (error) {
      res.send(error)
    }
  },
  DELETE: async (req, res) => {
    try {
      authJWT(req)
      const blog = await usersModel.deleteUser(req)

      res.send(blog)
    } catch (error) {
      res.send(error)
    }
  },
}
