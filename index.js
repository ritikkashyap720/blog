const express = require("express");
const userRouter = require("./routes/user.router");
const connectDB = require("./connection");
const cookieParser = require("cookie-parser");
const staticRouter = require("./routes/static.router");
const path = require("path");
const blogRouter = require("./routes/blog.router");
const app = express()

const PORT = 8000;
const MONGO_URL = "mongodb://localhost:27017/blog"

connectDB(MONGO_URL).then(()=>console.log("Database connected")).catch((error)=>console.log("Mongo Error :",error))

app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(cookieParser())

app.set('view engine', 'ejs')
app.set('views', path.resolve("./views"))

app.use("/user",userRouter)
app.use("/",staticRouter)
app.use("/blog",blogRouter)

app.listen(PORT,()=>{
    console.log(`Server started at PORT ${PORT}`)
})