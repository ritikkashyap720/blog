const Blog = require("../models/blog.model");
const uniqid = require("uniqid")

async function addBlog(req, res) {
    const { title, body } = req.body;
    const user = req.user

    if (title && body && user) {
        const blog = await Blog.create({ title, body, createdBy: user._id ,blogId: uniqid.time()})
        console.log(blog)

    } else {
        res.render("/addBlog", { error: "All fields are required" })
    }
}

module.exports = { addBlog }