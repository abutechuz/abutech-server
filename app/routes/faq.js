const router = require('express').Router()
const faq = require('../controllers/faq.js')

router
  .route('/')
  .get(faq.GET)
  .post(faq.POST)
  .delete(faq.DELETE)


module.exports = router