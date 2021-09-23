const express = require("express");
const routes = require("./routes");
const path = require("path");
const flash = require("connect-flash");
const expressValidator = require("express-validator");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const helpers = require("./helpers");
const passport = require("./config/passport");

// Create connection to database
const db = require("./config/db");

// Import model
require("./models/Projects");
require("./models/Tasks");
require("./models/Users");

db.sync()
  .then(() => console.log("Database connected"))
  .catch((error) => console.log(error));

const app = express();

// Load static files
app.use(express.static("public"));

//Enable Pug
app.set("view engine", "pug");

// enable body parser
app.use(express.urlencoded({ extended: true }));

// Add express-validator
app.use(expressValidator());

// Add view folder
app.set("views", path.join(__dirname, "./views"));

app.use(flash());
app.use(cookieParser());

app.use(
  session({
    secret: "supersecret",
    resave: false,
    saveUninitialized: false,
  })
);

// Send dump to app
app.use((req, res, next) => {
  res.locals.user = { ...req.user } || null;
  res.locals.vardump = helpers.vardump;
  res.locals.messages = req.flash();
  next();
});

app.use(passport.initialize());
app.use(passport.session());

app.use("/", routes());

app.listen(3000);
