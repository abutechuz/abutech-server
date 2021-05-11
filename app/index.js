const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const fileUpload = require('express-fileupload')
const cors = require('cors')

const auth = require('./library/auth.js')
const app = express()

// ROUTERS
const blog = require('./routes/blog.js')
const login = require('./routes/login.js')
const users = require('./routes/users.js')
const members = require('./routes/members.js')
const upload = require('./routes/upload.js')
const projecttype = require('./routes/project-types.js')
const projects = require('./routes/projects.js')
const techs = require('./routes/techs.js')
const partners = require('./routes/partners.js')
const services = require('./routes/services.js')
const docs = require('./routes/docs.js')
const submittion = require('./routes/submittion.js')



app.use(cors({
  origin: '*'
}))
app.use(express.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, '../data/')))
app.use(fileUpload({ parseNested: true }))
app.use(express.json())
app.use(cookieParser())

// set the routes
app.use('/blog', (req, res, next) => {
  const m = req.method

  if (m === 'POST', m === 'DELETE' || m === 'PUT') {
    auth(req, res, next)
  } else {
    next()
  }
}, blog)

app.use('/login', login)

app.use('/users', (req, res, next) => {
  const m = req.method
  auth(req, res, next)
}, users)

app.use('/members', (req, res, next) => {
  const m = req.method

  if (m === 'POST' || m === 'DELETE' || m === 'PUT') {
    auth(req, res, next)
  } else {
    next()
  }
}, members)


app.use('/upload', (req, res, next) => {
  const m = req.method

  if (m === 'POST' || m === 'DELETE' || m === 'PUT') {
    auth(req, res, next)
  } else {
    next()
  }
}, upload)


app.use('/projects', (req, res, next) => {
  const m = req.method

  if (m === 'POST' || m === 'DELETE' || m === 'PUT') {
    auth(req, res, next)
  } else {
    next()
  }
}, projects)

app.use('/projecttype', (req, res, next) => {
  const m = req.method

  if (m === 'POST' || m === 'DELETE' || m === 'PUT') {
    auth(req, res, next)
  } else {
    next()
  }
}, projecttype)

app.use('/techs', (req, res, next) => {
  const m = req.method

  if (m === 'POST' || m === 'DELETE' || m === 'PUT') {
    auth(req, res, next)
  } else {
    next()
  }
}, techs)

app.use('/partners', (req, res, next) => {
  const m = req.method

  if (m === 'POST' || m === 'DELETE' || m === 'PUT') {
    auth(req, res, next)
  } else {
    next()
  }
}, partners)

app.use('/services', (req, res, next) => {
  const m = req.method

  if (m === 'POST' || m === 'DELETE') {
    auth(req, res, next)
  } else {
    next()
  }
}, services)

app.use('/submittion', (req, res, next) => {
  const m = req.method

  if (m === 'DELETE' || m === 'GET') {
    auth(req, res, next)
  } else {
    next()
  }
}, submittion)

app.use('/docs', (req, res, next) => {
  const m = req.method

  if (m === 'POST') {
    auth(req, res, next)
  } else {
    next()
  }
}, docs)


const swaggerUi = require('swagger-ui-express')
const swaggerDocument = require('../swagger.json')

var options = {
  explorer: true
}

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, options))

app.use((err, req, res, next) => {
  console.log(err)
  next()
})

module.exports = app
