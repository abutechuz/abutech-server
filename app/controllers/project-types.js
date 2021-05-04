const projecttypes = require('../models/project-types.js')
const authJWT = require('../library/auth.js')

module.exports = {
  GET: async (req, res) => {
    try {
      authJWT(req)
      const blogs = await projecttypes.getProjectTypes(req)

      res.send(blogs)
    } catch (error) {
      console.log(error)
      res.send(error)
    }
  },
  POST: async (req, res) => {
    try {
      authJWT(req)
      const projecttype = await projecttypes.insertProjectType(req)

      res.send(projecttype)
    } catch (error) {
      res.send(error)
    }
  },
  PUT: async (req, res) => {
    try {
      authJWT(req)
      const returning = await projecttypes.setProjectType(req)

      res.send(returning)
    } catch (error) {
      res.send(error)
    }
  }
}
