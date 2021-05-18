const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const fileUpload = require('express-fileupload')
const swaggerUi = require('swagger-ui-express')
const swaggerDocument = require('../swagger.json')
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


app.use(cors({ origin: '*' }))
app.use(express.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, '../data/')))
app.use(fileUpload({ parseNested: true }))
app.use(express.json())
app.use(cookieParser())

app.use('/blogs', async (req, res, next) => await auth(req , res , next , ['GET']), blog)

app.use('/login', login)
app.use('/users', (req, res, next) => auth(req, res, next, []), users)
app.use('/members', (req, res, next) => auth(req, res, next, ['GET']), members)
app.use('/upload', (req, res, next) => auth(req, res, next, []), upload)
app.use('/projects', (req, res, next) => auth(req, res, next, ['GET']), projects)
app.use('/projecttype', (req, res, next) => auth(req, res, next, ['GET']), projecttype)
app.use('/techs', (req, res, next) => auth(req, res, next, ['GET']), techs)
app.use('/partners', (req, res, next) => auth(req, res, next, ['GET']), partners)
app.use('/services', (req, res, next) => auth(req, res, next, ['GET']), services)
app.use('/submittion', (req, res, next) => auth(req, res, next, ['POST']), submittion)
app.use('/docs', (req, res, next) => auth(req, res, next, ['GET']), docs)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, { explorer: true }))

module.exports = app
