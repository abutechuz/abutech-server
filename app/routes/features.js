const router = require('express').Router()
const features = require('../controllers/features.js')

router
  .route('/')
  .get(features.GET)
  .post(features.POST)
  .delete(features.DELETE)

module.exports = router