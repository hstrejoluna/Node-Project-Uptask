const passport = require("passport");
const Users = require("../models/Users");
const crypto = require("crypto");

// form signup

exports.formSignup = (req, res) => {
  res.render("signUp", {
    pageName: "Sign Up",
  });
};

//form login

exports.formLogin = (req, res) => {
  const { error } = res.locals.messages;
  res.render("login", {
    pageName: "Login",
    error,
  });
};

//Sign up

exports.signUp = async (req, res) => {
  //read data
  const { email, password } = req.body;

  try {
    await Users.create({
      email,
      password,
    });
    res.redirect("/login");
  } catch (error) {
    req.flash(
      "error",
      error.errors.map((error) => error.message)
    );
    res.render("signUp", {
      messages: req.flash(),
      pageName: "Sign Up to UpTask",
      email,
      password,
    });
  }
};

exports.formResetpassword = (req, res) => {
  res.render("resetPassword", {
    pageName: "Reset Password",
  });
};

exports.sendToken = async (req, res) => {
  const { email } = req.body;
  const user = await Users.findOne({ email });
  if (!user) {
    req.flash("error", "No account with that email exists");
    return res.redirect("/reset");
  }

  // User exists
  const token = crypto.randomBytes(20).toString("hex");
  const expiry = Date.now() + 3600000; // 1 hour from now
};
