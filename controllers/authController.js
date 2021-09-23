const passport = require("passport");

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
  res.redirect("/login");
};

exports.logOut = (req, res) => {
  req.session.destroy(() => {
    res.redirect("/login");
  });
};
