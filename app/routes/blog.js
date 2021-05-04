const router = require('express').Router()
const blog = require('../controllers/blog.js')

router
    .route('/')
    .get(blog.GET)
    .post(blog.POST)
    .put(blog.PUT)
    .delete(blog.DELETE)

// router.route(")

module.exports = router
