const Blog = require("../models/blog.model");
const uniqid = require("uniqid")

async function addBlog(req, res) {
    const { title, body } = req.body;
    const user = req.user

    if (title && body && user) {
        const blog = await Blog.create({ title, body, createdBy: user._id ,blogId: uniqid.time()})
        res.render("addblog",{blog,user:req.user})
    } else {
        res.render("addblog", {user:req.user, error: "All fields are required" })
    }
}



module.exports = { addBlog }