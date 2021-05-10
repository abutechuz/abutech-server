const memberModel = require('../models/members.js')
const authJWT = require('../library/auth.js')

module.exports = {
  GET: async (req, res) => {
    try {
      authJWT(req)
      const { page, limit } = req.query

      const members = await memberModel.getMembers(page, limit)

      res.send(members)

    } catch (error) {
      res.send(error)
    }
  },
  POST: async (req, res) => {
    try {
      authJWT(req)
      const member = await memberModel.addMember(req)

      res.send(member)
    } catch (error) {
      res.send(error)
    }
  },
  DELETE: async (req, res) => {
    try {
      authJWT(req)
      const deletedMember = await memberModel.deleteMember(req)

      res.send(deletedMember)
    } catch (error) {
      res.send(error)
    }
  }
}
