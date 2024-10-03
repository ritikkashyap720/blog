const secretKey = "blog@123456"
const jwt = require("jsonwebtoken")
function createToken(user,key) {
    const payLoad = {
        fullName: user.fullName,
        email: user.email,
        role: user.role,
        profileImageUrl: user.profileImageUrl
    }

    const token = jwt.sign(payLoad, secretKey)
    return token
}

function validateToken(token) {
    const payload = jwt.verify(token, secretKey)
    return payload
}

module.exports = {
    createToken,
    validateToken
}