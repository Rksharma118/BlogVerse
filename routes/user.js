const { Router } = require("express");
const User = require("../models/user");
const router = Router();

router.get("/signin", (req, res) => {
  res.render("signin");
});
router.get("/signup", (req, res) => {
  res.render("signup");
});

router.post("/signup", async (req, res) => {
  const { fullName, email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email: email });

    if (existingUser) {
      res.send("Email already exists. Try logging in.");
    } else {
      const newUser = new User({
        fullName: fullName,
        email: email,
        password: password,
      });
      await newUser.save();
      res.redirect("/home");
    }
  } catch (err) {
    console.log(err);
    res.status(500).send("Error registering user");
  }
});

router.post("/signin", async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  try {
    const token = await User.matchPasswordAndGenerateToken(email, password);
    return res.cookie("token", token).redirect("/home"); // Redirect or render as needed
  } catch (err) {
    return res.render("signin", {
      error: "Incorrect email or password",
    });
  }
});

router.get("/logout", (req, res) => {
  res.clearCookie("token").redirect("/");
});
module.exports = router;
