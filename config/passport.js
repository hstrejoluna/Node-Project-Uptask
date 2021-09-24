const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

// Reference to the User model
const Users = require("../models/Users");

// local strategy - Login with own credentials (username and password)

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    async (email, password, done) => {
      try {
        const user = await Users.findOne({
          where: { email, active: 1 },
        });
        if (!user.verifyPassword(password)) {
          return done(null, false, { message: "Incorrect password" });
        }

        // email exists and password is correct
        return done(null, user);
      } catch (error) {
        return done(null, false, {
          message: "Account doesn't exist",
        });
      }
    }
  )
);

// serialize user
passport.serializeUser((user, callback) => {
  callback(null, user);
});

// deserialize user
passport.deserializeUser((user, callback) => {
  callback(null, user);
});

module.exports = passport;
