const User = require("../models/user")
const path = require("path")
const multer = require("multer");

async function handleUserLogin(req, res) {
    const { email, password } = req.body;
    if (email && password) {
        const result = await User.matchPassword(email, password)
        if (result.error) {
            res.render("login", { result, user: null })
        } else {
            res.cookie("token", result).redirect("/")
        }
    }
}
async function handleUserRegister(req, res) {
    const { fullName, email, password } = req.body
    if (fullName && email && password) {
        try {
            const result = await User.create({ fullName, email, password })
            if (result) {
                res.redirect("/login")
            }
        } catch (error) {
            res.render("signin", { error: "Email id already exists!", user: null })
        }
    }
}


  

async function handleAddBlog(req, res) {
    console.log(req)
    console.log(req)
    res.redirect("/")
}

module.exports = { handleUserLogin, handleUserRegister, handleAddBlog }