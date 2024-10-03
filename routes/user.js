const { Router } = require("express")
const { handleUserLogin, handleUserRegister, handleAddBlog } = require("../controllers/user")
const { checkIfUserLogined, ifUserNotLoggedIn } = require("../middlware/authentication")
const router = Router()
const multer  = require('multer')
const path = require("path")

router.get("/signin", checkIfUserLogined(), (req, res) => {
    res.render("signin", { user: req.user })
})
router.get("/login", checkIfUserLogined(), (req, res) => {
    res.render("login", { user: req.user })
})
router.post("/signin", handleUserRegister)
router.post("/login", handleUserLogin)
router.get("/", (req, res) => {
    res.render("home", { user: req.user })
})
router.get("/addblog", ifUserNotLoggedIn(), (req, res) => {
    return res.render("addblog", { user: req.user })
})
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/uploads')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + file.originalname;
      cb(null,uniqueSuffix)
    }
  })

const upload = multer({
    storage: storage
})


router.post("/addblog", upload.single('coverImageURL'),(req,res)=>{
    console.log(req.file)
})


router.get("/logout", (req, res) => { res.clearCookie("token").redirect("/") })

module.exports = router