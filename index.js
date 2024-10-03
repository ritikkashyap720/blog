const express = require("express")
const path = require("path");
const router = require("./routes/user");
const cookieParser = require("cookie-parser")
const connectDB = require("./connection/connection");
const { checkForAuthenticaionCookies } = require("./middlware/authentication");



const app = express();
PORT = 8000;
URL = "mongodb://localhost:27017/blog"
connectDB(URL).then().catch((error) => { console.log("Mongo error : ", error) })
app.use(express.urlencoded({ extended: false }))
app.use(express.static(path.resolve("./public")))
app.use(express.json())
app.use(cookieParser())
app.use(checkForAuthenticaionCookies())

app.set('view engine', 'ejs')
app.set('views', path.resolve("./views"))

app.use("/", router)

app.listen(PORT, () => { console.log("Server started at port " + PORT) })
