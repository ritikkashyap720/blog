const jwt = require("jsonwebtoken")
const JWT_SECRET = "BLOGAPP"

function createToken(data) {
    return new Promise((resolve, reject) => {
        try {
            resolve(jwt.sign(data, JWT_SECRET))
        } catch (error) {
            reject(error)
        }
    })
}
function verifyToken(token) {
    return new Promise((resolve, reject) => {
        try {
            resolve(jwt.verify(token,JWT_SECRET))
        } catch (error) {
            reject(error)
        }
    })
}

module.exports = { createToken, verifyToken }

