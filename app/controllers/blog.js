const blogsModel = require('../models/blog.js')

module.exports = {
  GET: async (req, res) => {
    try {
      const blogs = await blogsModel.getBlogs(req)

      res.send(blogs)
    } catch (error) {
      console.log(error)
      res.send(error)
    }
  },
  POST: async (req, res) => {
    try {
      const blogs = await blogsModel.insertBlog(req)

      res.send(blogs)
    } catch (error) {
      res.send(error)
    }
  },
  PUT: async (req, res) => {
    try {
      const returning = await blogsModel.setBlog(req)

      res.send(returning)
    } catch (error) {
      res.send(error)
    }
  },
  DELETE: async (req, res) => {
    try {
      const blog = await blogsModel.deleteBlog(req)

      res.send(blog)
    } catch (error) {
      res.send(error)
    }
  }
}
