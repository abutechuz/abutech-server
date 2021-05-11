const usersModel = require('../models/users.js')
const { verify } = require('../library/jwt.js')

module.exports = {
  GET: async (req, res) => {
    try {
      const users = await usersModel.getUsers(req)

      res.send(users)
    } catch (error) {
      console.log(error)
      res.send(error)
    }
  },
  POST: async (req, res) => {
    try {
      const user = await usersModel.insertUser(req)

      res.send(user)
    } catch (error) {
      res.send(error)
    }
  },
  PUT: async (req, res) => {
    try {
      const returning = await usersModel.setUser(req)

      res.send(returning)
    } catch (error) {
      res.send(error)
    }
  },
  DELETE: async (req, res) => {
    try {
      const user = await usersModel.deleteUser(req)

      res.send(user)
    } catch (error) {
      res.send(error)
    }
  },
}
