const router = require('express').Router()
const users = require('../controllers/users.js')

router
    .route('/')
    .get(users.GET)
    .post(users.POST)
    .put(users.PUT)
    .delete(users.DELETE)

module.exports = router