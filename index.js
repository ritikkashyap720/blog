const express = require("express");
const userRouter = require("./routes/user.router");
const connectDB = require("./connection");
const cookieParser = require("cookie-parser");
const staticRouter = require("./routes/static.router");
const path = require("path");
const blogRouter = require("./routes/blog.router");
const app = express()
require("dotenv").config()

const PORT = process.env.PORT;
const MONGO_URL = process.env.MONGOURL



connectDB(MONGO_URL).then(()=>console.log("Database connected")).catch((error)=>console.log("Mongo Error :",error))

app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(cookieParser())

app.set('view engine', 'ejs')
app.set('views', path.resolve("./views"))

app.use(express.static('public'));
app.use("/",staticRouter)
app.use("/user",userRouter)
app.use("/blog",blogRouter)


app.listen(PORT,()=>{
    console.log(`Server started at PORT ${PORT}`)
})