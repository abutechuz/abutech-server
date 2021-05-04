const router = require('express').Router()
const projects = require('../controllers/projects.js')

router
    .route('/')
    .get(projects.GET)
    .post(projects.POST)
    .put(projects.PUT)
    .delete(projects.DELETE)





module.exports = router
