const upload = require("../middleware/uploadFile");
const Blog = require("../models/blog.model");
const uniqid = require("uniqid")

async function addBlog(req, res) {
    const { title, body } = req.body;
    console.log(title, body)
    const user = req.user
    const thumbnail = req.file ? '/uploads/' + req.file.filename : null;

    if (title && body && user && thumbnail) {
        const blog = await Blog.create({ title, body, thumbnail, createdBy: user._id, blogId: uniqid.time() })

        res.render("addblog", { blog, user: req.user })
    } else {
        res.render("addblog", { user: req.user, blog: null, error: "All fields are required" })
    }
}

async function addComment(req, res) {
    const { msg } = req.body;
    console.log(req.body)
    const { blogId } = req.params;
    const blog = await Blog.findOne({ blogId })
    if (blog) {
        const comment = { msg, commentBy: req.user._id };
        if (blog) {
            blog.comments.push(comment)
            await blog.save()
            res.status(200).redirect(`/${blogId}`)
        }
    } else {
        res.status(200).redirect("/")
    }
}


module.exports = { addBlog, addComment }