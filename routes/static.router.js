const express = require("express")
const { checkAuthToken, restrictNotLoginedUsers } = require("../middleware/auth")
const Blog = require("../models/blog.model")
const staticRouter = express.Router()

staticRouter.get("/signup", checkAuthToken, (req, res) => {
    if (req.user) {
        res.redirect("/")
    } else {
        res.render("signup")
    }
})
staticRouter.get("/login", checkAuthToken, (req, res) => {
    if (req.user) {
        res.redirect("/")
    } else {
        res.render("login")
    }
})
staticRouter.get("/", checkAuthToken, async (req, res) => {
    // if (req.user) {
    //     res.render("index", { user: req.user})
    // } else {
    //     res.render("index", { user: null})
    // }
    res.render("index")
})
staticRouter.get("/logout", checkAuthToken, (req, res) => {
    res.clearCookie("token").redirect("/login")
})

staticRouter.get("/add-blog", restrictNotLoginedUsers, (req, res) => {
    const user = req.user;
    res.render("addBlog", { user: user })
})



module.exports = staticRouter