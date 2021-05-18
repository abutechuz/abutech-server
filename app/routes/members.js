const router = require('express').Router()
const members = require('../controllers/members.js')

router
    .route('/')
    .get(members.GET)
    .post(members.POST)
    .delete(members.DELETE)

module.exports = router
