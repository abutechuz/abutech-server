const memberModel = require('../models/members.js')
const { verify } = require('../library/jwt.js')

module.exports = {
  GET: async ({ cookies: { token }, query: { page, limit }}, res) => {
    try {
      verify(token)
      const members = await memberModel.getMembers(page, limit)

      res.send(members)
    } catch (error) {
      res.status(401).send(error)
    }
  },
  POST: async (req, res) => {
    try {
      verify(req.cookies.token)
      const member = await memberModel.addMember(req)

      res.send(member)
    } catch (error) {
      res.send(error)
    }
  },
  DELETE: async (req, res) => {
    try {
      verify(req.cookies.token)
      const deletedMember = await memberModel.deleteMember(req)

      res.send(deletedMember)
    } catch (error) {
      res.send(error)
    }
  }
}
