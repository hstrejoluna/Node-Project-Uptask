const Users = require("../models/Users");

exports.formSignup = (req, res) => {
  res.render("signup", {
    pageName: "Sign Up",
  });
};

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
    });
  }
};
