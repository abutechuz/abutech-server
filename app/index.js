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

  if (m === 'POST' || m === 'DELETE' || m === 'GET') {
    auth(req, res, next)
  } else {
    next()
  }
}, blog)

app.use('/login', login)
app.use('/users', users)
app.use('/members', members)
app.use('/upload', upload)
app.use('/projects', projects)
app.use('/projecttype', projecttype)
app.use('/techs', techs)
app.use('/partners', partners)
app.use('/services', services)
app.use('/submittion', submittion)
app.use('/docs', docs)



const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger.json');

var options = {
  explorer: true
};

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, options));
module.exports = app
