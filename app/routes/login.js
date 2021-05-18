const router = require('express').Router()
const login = require('../controllers/login.js')

router
    .route('/')
    .post(login.POST)

// router.route(")

module.exports = router
