const mongoose = require("mongoose")

function connectDB(URL) {
    return mongoose.connect(URL)
}

module.exports = connectDB