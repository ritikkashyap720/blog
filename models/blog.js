const { Schema, model, default: mongoose } = require("mongoose")
const blogScheam = new Schema({
    title:{
        type:String,
        required:true,
    },
    body:{
        type:String,
        required:true
    },
    coverImageURL:{
        type:String,
        required:true
    },
    createdBy:{
        type:Schema.Types.ObjectId,
        required:true,
        ref:"user"
    }
},{timestamps:true})

const Blog = model("blog",blogScheam)

module.exports = Blog