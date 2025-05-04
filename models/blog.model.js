const mongoose = require("mongoose")

const commentSchema = new mongoose.Schema({
    msg: {
        type: String,
        required: true
    },
    commentBy: {
        type: mongoose.Schema.ObjectId,
        required: true,
        ref:"user"
    },
}, { timestamps: true })


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
        required: true,
        ref:"user"
    },
    blogId: {
        type: String,
        required: true,
        unique: true
    },
    thumbnail:{
        type:String,
        required:true
    },
    comments: [commentSchema]
}, { timestamps: true })


const Blog = mongoose.model("blog", blogSchema)

module.exports = Blog;