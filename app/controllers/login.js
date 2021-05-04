const login = require('../models/login.js')
const { sign } = require('../library/jwt.js')

module.exports = {
  POST: async (req, res) => {
    try {
      const { username, password } = req.body

      const user = await login(username, password)
      const token = sign(user, { expiresIn: 60 * 60 * 3600 })

      res.cookie('token', token).end()

    } catch (error) {

      res.status(401).send({
        code: 401,
        message: error.message
      })

      console.log(error)
    }
  }
}
