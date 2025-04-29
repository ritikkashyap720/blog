const express = require("express")
const { addBlog } = require("../controller/blog.controller")
const { restrictNotLoginedUsers } = require("../middleware/auth")
const blogRouter = express.Router()

blogRouter.post("/addBlog",restrictNotLoginedUsers,addBlog)

module.exports = blogRouter