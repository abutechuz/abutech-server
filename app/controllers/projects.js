const projectsModel = require('../models/projects.js')
const { verify } = require('../library/jwt.js')

module.exports = {
  GET: async (req, res) => {
    try {
      const pjs = await projectsModel.getProjects(req)

      res.send(pjs)
    } catch (error) {
      console.log(error)
      res.send(error)
    }
  },

  POST: async (req, res) => {
    try {
      const blogs = await projectsModel.insertProject(req)

      res.send(blogs)
    } catch (error) {
      res.send(error)
    }
  },

  DELETE: async (req, res) => {
    try {
      const blog = await projectsModel.deleteProject(req)

      res.send(blog)
    } catch (error) {
      res.send(error)
    }
  }
}
