const router = require('express').Router()
const submission = require('../controllers/submittion.js')

router
    .route('/')
    .get(submission.GET)
    .post(submission.POST)
    .delete(submission.DELETE)



module.exports = router
