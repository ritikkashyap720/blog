const mongoose = require("mongoose")
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
}, { timestamps: true });

userSchema.pre("save", async function (next) {
    try {
        if (!this.isModified("password")) next()
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt)
        next()
    } catch (error) {
        next(Error)
    }
})


const User = mongoose.model("user", userSchema)

module.exports = User;