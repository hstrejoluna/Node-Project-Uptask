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
    res.render("signUp", {
      error: error.errors,
      pageName: "Sign Up to UpTask",
    });
  }
};
