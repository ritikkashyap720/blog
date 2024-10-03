const { Schema, model } = require("mongoose")
const { createHmac, randomBytes } = require("crypto");
const { createToken } = require("../utils/manageToken");

const userSchema = new Schema({
    fullName: {
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
    },
    key: {
        type: String,
    },
    profileImageUrl: {
        type: String,
        default: "/images/default.png"
    },
    role: {
        type: String,
        enum: ["USER", "ADMIN"],
        default: "USER"
    }
}, { timestamps: true })


userSchema.pre("save", function (next) {
    const user = this;
    if (!user.isModified("password")) return
    const key = randomBytes(16).toString();
    const hashedPassword = createHmac("sha256", key).update(user.password).digest("hex");
    this.key = key;
    this.password = hashedPassword;
    next()
})

userSchema.static("matchPassword", async function (email, password) {
    const user = await this.findOne({ email });
    if (!user) return { error: "Account doesn't exists" };

    const key = user.key;
    const hashedPassword = user.password;
    const userProvidedPassword = createHmac("sha256", key).update(password).digest("hex")
    console.log(userProvidedPassword)
    if (hashedPassword !== userProvidedPassword) {
        return { error: "Incorrect password" }
    } else {
        return createToken(user);
    }

})

const User = model("user", userSchema)
module.exports = User;