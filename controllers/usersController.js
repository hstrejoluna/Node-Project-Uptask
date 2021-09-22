const Users = require("../models/Users");

exports.formSignup = (req, res) => {
  res.render("signup", {
    pageName: "Sign Up",
  });
};

exports.signUp = (req, res) => {
  //read data
  const { email, password } = req.body;
  //create new user
  Users.create({
    email,
    password,
  }).then(() => {
    res.redirect("/login");
  });
};
