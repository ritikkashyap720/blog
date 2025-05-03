const { verifyToken } = require("../utils/jwt");

async function restrictNotLoginedUsers(req, res, next) {
    const cookie = req.cookies.token;
    if (!cookie) return res.redirect("/login")
    try {
        const user = await verifyToken(cookie);
        req.user = user;
        next()
    } catch (error) {
        console.log(error)
        res.redirect("/login")
    }
}

async function checkAuthToken(req,res,next) {
    const cookie = req.cookies.token;
   
    if (cookie) {
        try {
            const user  = await verifyToken(cookie)
            req.user = user
            next()
        } catch (error) {
            console.log(error)
            next()
        }
    } else{
        next()
    }  

}

module.exports = {checkAuthToken,restrictNotLoginedUsers};