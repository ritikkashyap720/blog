const User = require("../models/user.model")
const bcrypt = require('bcrypt');
const { createToken } = require("../utils/jwt");

async function handleSignup(req, res) {
    const { name, email, password } = req.body
    
    if (name && email && password) {
        const userExist = await User.findOne({ email })
        if (userExist) return res.render("signup",{ error: "Email already exist" })

        try {
            const user = await User.create({ name, email, password })
            const token = await createToken({ name: user.name, email: user.email, _id: user._id })
            res.cookie('token', token).redirect("/")

        } catch (error) {
            res.status(401).render("signup",{ error: "Error creating user" })
            console.log(error)
        }
    } else {
        res.status(401).render("signup",{ error: "All field are required" })
    }
}

async function handleLogin(req, res) {
    const { email, password } = req.body;

    if (email && password) {
        try {
            const user = await User.findOne({ email });
            if (user) {
                const result = await bcrypt.compare(password, user.password)
                if (result) {
                    const token = await createToken({ name: user.name, email: user.email, _id: user._id })
                    res.cookie('token', token).redirect("/")
                } else {
                    res.status(401).render("login",{ error: "Incorrect email or password" })
                }
            } else {
                res.status(401).render("login",{ error: "Incorrect email or password" })
            }
        } catch (error) {
            res.status(401).render("login",{ error: "Incorrect email or password" })
        }
    } else {
        res.status(401).render("login",{ error: "All field are required" })
    }
}

module.exports = { handleSignup, handleLogin }