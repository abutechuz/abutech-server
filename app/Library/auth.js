const { verify } = require('./jwt.js')

module.exports = (req) => {

  try {
    const { token } = req.cookies
    const user = verify(token)
    return user
  } catch (error) {
    console.log(error)
    throw new Error(error)
  }

}

