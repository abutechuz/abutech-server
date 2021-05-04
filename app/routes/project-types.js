const router = require('express').Router()
const projecttypes = require('../controllers/project-types.js')

router
    .route('/')
    .post(projecttypes.POST)
    .get(projecttypes.GET)
    .put(projecttypes.PUT)



module.exports = router
