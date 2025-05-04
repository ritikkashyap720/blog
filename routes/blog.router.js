const express = require("express")
const { addBlog, addComment } = require("../controller/blog.controller")
const { restrictNotLoginedUsers } = require("../middleware/auth")
const uploadFile = require("../middleware/uploadFile")
const blogRouter = express.Router()

blogRouter.post("/addBlog", restrictNotLoginedUsers,uploadFile, addBlog)
blogRouter.post("/comment/:blogId", restrictNotLoginedUsers, addComment)

module.exports = blogRouter