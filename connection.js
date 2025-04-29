const mongoose = require("mongoose")

function connectDB(URL) {
    return new Promise(async (resolve,reject)=>{
     try {
        await mongoose.connect(URL)
        resolve()
     } catch (error) {
        reject(error)
     }
    })
}

module.exports = connectDB