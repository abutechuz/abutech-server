const router = require('express').Router()
const techs = require('../controllers/techs.js')

router
    .route('/')
    .get(techs.GET)
    .post(techs.POST)
    .delete(techs.DELETE)


module.exports = router
