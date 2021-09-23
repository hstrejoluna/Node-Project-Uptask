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
        const user = await Users.find({
          where: { email: email },
        });
        if (!user.verifyPassword(password)) {
        }
      } catch (error) {
        return done(null, false, {
          message: "Account doesn't exist",
        });
      }
    }
  )
);
