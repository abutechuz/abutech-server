const { verify } = require('./jwt.js')
const { fetchOne } = require('../library/database/postgres.js')

const auth = async (req , res , next , norequired_methods) => {

  if(! Array.isArray(norequired_methods)){
    norequired_methods = []
  }

  if(!norequired_methods.includes(req.method)) {

    verify(req.cookies.token ,async (err, user) => {

      if (err) {

        return res.status(403).json(err).end();
      } else if (! await fetchOne(`select user_id from users where user_id = $1` , user.user_id)){

        return res.status(404).json({"message" : "User is not defined"}).end()
      } else {

        next()
      }
    })
  } else {

    next()
  }
}

module.exports = auth












// const auth = async ({ cookies: { token } }, res, next) => {
//   const { verify } = require('./jwt.js')
//   const { fetchOne } = require('./database/postgres.js')
//   const SQL = `select user_id from users where user_id = $1`

//   try {
//     const user = await verify(token)
//     const { user_id } = await fetchOne(SQL, user.user_id)

//     if (user_id > 0) {
//       next()
//     } else {
//       res.status(403).end()
//     }

//   } catch (error) {
//     next(error)
//   }
// }

// module.exports = auth
