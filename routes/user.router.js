const express = require("express");
const { handleLogin, handleSignup } = require("../controller/user.controller");
const userRouter = express.Router();


userRouter.post("/login",handleLogin)
userRouter.post("/signup",handleSignup)

module.exports = userRouter