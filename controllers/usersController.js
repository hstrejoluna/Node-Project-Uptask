const passport = require("passport");
const Users = require("../models/user");

// form signup

export function formSignup(req, res) {
  res.render("signUp", {
    pageName: "Sign Up",
  });
}

//form login

export function formLogin(req, res) {
  const { error } = res.locals.messages;
  res.render("login", {
    pageName: "Login",
    error,
  });
}

//Sign up

export async function signUp(req, res) {
  //read data
  const { email, password } = req.body;

  try {
    await create({
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
}

export function formResetpassword(req, res) {
  res.render("resetPassword", {
    pageName: "Reset Password",
  });
}

exports.sendToken = async (req, res) => {
  const { email } = req.body;
  const user = await Users.findOne({ email });
  if (!user) {
    req.flash("error", "No account with that email exists");
    return res.redirect("/reset");
  }
};
