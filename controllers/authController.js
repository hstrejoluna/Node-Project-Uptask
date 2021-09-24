const passport = require("passport");
const Users = require("../models/Users");
const crypto = require("crypto");
const Sequelize = require("sequelize");
const bcrypt = require("bcrypt");
const sendEmail = require("../handlers/email");
const Op = Sequelize.Op;

exports.authUser = passport.authenticate("local", {
  successRedirect: "/",
  failureRedirect: "/login",
  failureFlash: true,
  badRequestMessage: "Please enter username and password",
});

exports.userAuthenticated = (req, res, next) => {
  // if user is authenticated in the session, carry on
  if (req.isAuthenticated()) {
    return next();
  }
  // if they aren't redirect them to the home page
  return res.redirect("/login");
};

exports.logOut = (req, res) => {
  req.session.destroy(() => {
    res.redirect("/login");
  });
};

//generate token if user is valid
exports.sendToken = async (req, res) => {
  const { email } = req.body;
  const user = await Users.findOne({where: { email }});
  if (!user) {
    req.flash("error", "No account with that email exists");
    return res.redirect("/reset");
  }

  // User exists
  user.token = crypto.randomBytes(20).toString("hex");
  user.expiry = Date.now() + 3600000; // 1 hour from now

  await user.save();

  // RESET URL
  const resetUrl = `http://${req.headers.host}/reset/${user.token}`;

  // Send email with
  await sendEmail.send({
    user,
    subject: "Password reset",
    resetUrl,
    file: "reset-password",
  });
  req.flash('success', "Check your inbox for instructions")
  res.redirect("/login");
};


//validate token
exports.resetPassword = async (req, res) => {
  const user = await Users.findOne({
    where: {
      token: req.params.token,
    },
  });
  if (!user) {
    req.flash("error", "Token has expired or is invalid");
    res.redirect("/reset");
  }
  res.render("resetForm", {
    pageName: "Reset Password",
  });
};

exports.updatePassword = async (req, res) => {
  // verify valid token and expiry
  const user = await Users.findOne({
    where: {
      token: req.params.token,
      expiry: {
        [Op.gte]: Date.now(),
      },
    },
  });

  if (!user) {
    req.flash("error", "Not valid");
    req.redirect("/reset");
  }
  user.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));
  user.token = null;
  user.expiry = null;

  // save new password
  await user.save();

  req.flash("success", "Password has been reset");
  res.redirect("/login");
};
