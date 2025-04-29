const mongoose = require("mongoose")
const uniqid = require("uniqid")

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    createdBy: {
        type: mongoose.Schema.ObjectId,
        required: true
    },
    blogId: {
        type: String,
        required: true
    }
}, { timestamps: true })


const Blog = mongoose.model("blog", blogSchema)

module.exports = Blog;