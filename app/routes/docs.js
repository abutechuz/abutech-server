const router = require('express').Router()
const doc = require('../controllers/doc.js')

router
    .get("/" , doc.GET)
    .get("/download/:id" , doc.GETBYID)
    .post("/" ,doc.POST)

module.exports = router
