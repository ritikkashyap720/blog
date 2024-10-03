const { validateToken } = require("../utils/manageToken")

function checkForAuthenticaionCookies() {
    return (req, res, next) => {
        const cookie = req.cookies.token
        if (!cookie) {
            return next()
        } else {
            try {
                const userPaylaod = validateToken(cookie)
                req.user = userPaylaod
                next()
            } catch (error) {
            }
            return next()
        }
    }
}

function checkIfUserLogined(){
    return(req,res,next)=>{
        if(req.user){
            res.redirect("/")
        }else{
            return next()
        }
    }
}
function ifUserNotLoggedIn(){
    return(req,res,next)=>{
        if(!req.user){
            res.redirect("/login")
        }else{
            return next()
        }
    }
}

module.exports = {
    checkForAuthenticaionCookies,
    checkIfUserLogined,
    ifUserNotLoggedIn
}