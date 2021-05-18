const router = require('express').Router()
const services = require('../controllers/services.js')

router
  .route('/')
  .get(services.GET)
  .post(services.POST)
  .delete(services.DELETE)

module.exports = router
