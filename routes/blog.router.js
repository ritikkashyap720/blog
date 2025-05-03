const express = require("express")
const { addBlog, addComment } = require("../controller/blog.controller")
const { restrictNotLoginedUsers } = require("../middleware/auth")
const blogRouter = express.Router()

blogRouter.post("/addBlog", restrictNotLoginedUsers, addBlog)
blogRouter.post("/comment/:blogId", restrictNotLoginedUsers, addComment)

module.exports = blogRouter