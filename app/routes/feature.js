const router = require('express').Router()
const features = require('../controllers/feature.js')

router
  .route('/')
  .get(features.GET)
  .post(features.POST)
  .delete(features.DELETE)

module.exports = router