const router = require('express').Router()
const upload = require('../controllers/upload.js')

router
    .route('/')
    .post(upload.POST)
    .get(upload.GET)




module.exports = router
