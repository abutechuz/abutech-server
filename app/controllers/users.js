const usersModel = require('../models/users.js')
// const authJWT = require('../library/auth.js')
// const auth = require('../library/auth.js')

module.exports = {
  GET: async (req, res) => {
    try {
      // authJWT(req)
      const users = await usersModel.getUsers(req)

      res.send(users)
    } catch (error) {
      console.log(error)
      res.send(error)
    }
  },
  POST: async (req, res) => {
    try {
      // authJWT(req)
      const user = await usersModel.insertUser(req)

      res.send(user)
    } catch (error) {
      res.send(error)
    }
  },
  PUT: async (req, res) => {
    try {
      // authJWT(req)
      const returning = await usersModel.setUser(req)

      res.send(returning)
    } catch (error) {
      res.send(error)
    }
  },
  DELETE: async (req, res) => {
    try {
      // authJWT(req)
      const user = await usersModel.deleteUser(req)

      res.send(user)
    } catch (error) {
      res.send(error)
    }
  },
}
