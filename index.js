const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const app = express();
const port = 3000;

const User = require("./models/user.js");
const Blog = require("./models/blog.js");

const cookieParser = require("cookie-parser");
const { checkForAuthCookie } = require("./middleware/auth.js");
const dotenv = require("dotenv").config();

const userRoute = require("./routes/user.js");
const blogRoute = require("./routes/blog.js");

app.use(cookieParser());
app.use(checkForAuthCookie("token"));
mongoose
  .connect(process.env.MONGO_URL)
  .then((e) => console.log("Mongoose is Connected"));

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.resolve("./public")));

app.use("/user", userRoute);
app.use("/blog", blogRoute);

app.get("/", async (req, res) => {
  res.render("signup");
});

app.get("/home", async (req, res) => {
  const allBlogs = await Blog.find({});
  res.render("home", {
    user: req.user,
    blogs: allBlogs,
  });
});

app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});
