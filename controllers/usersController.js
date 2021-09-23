const Users = require("../models/Users");
const sendEmail = require("../handlers/email");

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

    const confirmUrl = `http://${req.headers.host}/confirm/${email}`;

    const user = {
      email,
    };

    await sendEmail.send({
      user,
      subject: "Confirm your UpTask account",
      resetUrl,
      file: "confirm-account",
    });


    req.flash("success", "Please check your email to confirm your account");
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
