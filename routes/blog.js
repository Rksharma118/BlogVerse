const { Router } = require("express");
const router = Router();
const path = require("path");

const Blog = require("../models/blog");

//Create Blog
router.get("/add-new", (req, res) => {
  res.render("addBlog", {
    user: req.user,
  });
});

router.get("/:id", async (req, res) => {
  const blog = await Blog.findById(req.params.id);
  return res.render("blog", {
    user: req.user,
    blog,
  });
});

router.post("/", async (req, res) => {
  const { title, body, desc, author } = req.body;
  const blog = await Blog.create({
    title,
    body,
    desc,
    author,
  });
  return res.redirect(`/blog/${blog._id}`);
});

//Edit Blog
router.get("/:id/edit", async (req, res) => {
  const blog = await Blog.findById(req.params.id);
  return res.render("editBlog", {
    user: req.user,
    blog,
  });
});

router.post("/:id/edit", async (req, res) => {
  const { title, body, desc } = req.body;
  await Blog.findByIdAndUpdate(req.params.id, {
    title,
    body,
    desc,
  });
  return res.redirect(`/blog/${req.params.id}`);
});

// Delete Blog
router.post("/:id/delete", async (req, res) => {
  await Blog.findByIdAndDelete(req.params.id);
  return res.redirect("/home");
});

module.exports = router;
