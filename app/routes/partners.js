const router = require('express').Router()
const partners = require('../controllers/partners.js')

router
.route('/')
.get(partners.GET)
.post(partners.POST)
.delete(partners.DELETE)
.put(partners.PUT)

module.exports = router
