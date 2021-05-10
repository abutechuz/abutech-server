const router = require('express').Router()
const doc = require('../controllers/doc.js')

router
    .route('/')
    .get(doc.GET)
    .post(doc.POST)
    // .put(doc.PUT)
    // .delete(doc.DELETE)

module.exports = router
