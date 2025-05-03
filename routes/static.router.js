const express = require("express")
const { checkAuthToken, restrictNotLoginedUsers } = require("../middleware/auth")
const Blog = require("../models/blog.model")
const staticRouter = express.Router()

staticRouter.get("/signup", checkAuthToken, (req, res) => {
    if (req.user) {
        res.redirect("/")
    } else {
        res.render("signup", { error: null })
    }
})

staticRouter.get("/login", checkAuthToken, (req, res) => {
    if (req.user) {
        res.redirect("/")
    } else {
        res.render("login", { error: null })
    }
})

staticRouter.get("/", checkAuthToken, async (req, res) => {
    const allBlogs = await Blog.find()
    if (req.user) {
        res.render("index", { user: req.user,blogs:allBlogs })
    } else {
        res.render("index", { user: null, blogs: null })
    }
})

staticRouter.get("/logout", checkAuthToken, (req, res) => {
    res.clearCookie("token").redirect("/login")
})

staticRouter.get("/add-blog", restrictNotLoginedUsers, (req, res) => {
    const user = req.user;
    res.render("addblog", { user: user,blog:null })
})



module.exports = staticRouter