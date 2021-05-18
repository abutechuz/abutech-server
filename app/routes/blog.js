const router = require('express').Router()
const blog = require('../controllers/blog.js')

router
    .get("/",blog.GET)
    .get("/getbyid" , blog.GETBYID)
    .post("/",blog.POST)
    .put("/",blog.PUT)
    .delete("/" ,blog.DELETE)

// router.route(")

module.exports = router
