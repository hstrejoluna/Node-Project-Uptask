const express = require("express");
const routes = require("./routes");
const app = express();
const path = require("path");

app.listen(3000, () => console.log("Server started on port 3000"));

// helpers
const helpers = require("./helpers");

// Create connection to database
const db = require("./config/db");

// Import model
require("./models/Projects");
require("./models/Tasks");
require("./models/Users");

db.sync()
  .then(() => console.log("Database connected"))
  .catch((err) => console.log(err));

//Enable Pug
app.set("view engine", "pug");

// Load static files
app.use(express.static("public"));

// enable body parser
app.use(express.urlencoded({ extended: true }));

// Send dump to app
app.use((req, res, next) => {
  res.locals.vardump = helpers.vardump;
  next();
});

// Add view folder
app.set("views", path.join(__dirname, "./views"));

app.use("/", routes());
