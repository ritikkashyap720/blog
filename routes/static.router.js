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
        res.render("index", { user: req.user, blogs: allBlogs })
    } else {
        res.render("index", { user: null, blogs: allBlogs })
    }
})

staticRouter.get("/logout", checkAuthToken, (req, res) => {
    res.clearCookie("token").redirect("/login")
})

staticRouter.get("/add-blog", restrictNotLoginedUsers, (req, res) => {
    const user = req.user;
    res.render("addblog", { user: user, blog: null })
})

staticRouter.get("/:blogId", checkAuthToken, async (req, res) => {
    const { blogId } = req.params;
    const blog = await Blog.findOne({ blogId }).populate('createdBy', "name _id").populate('comments.commentBy', "name _id").sort({ createdAt: -1 })
    if (blog && blog.comments && blog.comments.length) {
        blog.comments.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)); // newest first
    }
    if (blog) {
        if (req.user) {
            res.status(200).render("blog", { blog, user: req.user })
        } else {
            res.status(200).render("blog", { blog, user: null })
        }
    } else {
        if (req.user) {
            res.status(200).render("blog", { blog: null, user: req.user })
        } else {
            res.status(200).render("blog", { blog: null, user: null })
        }
    }
})



module.exports = staticRouter