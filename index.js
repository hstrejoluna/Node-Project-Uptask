const express = require("express");
const routes = require("./routes");
const app = express();
const path = require("path");

app.listen(3000, () => console.log("Server started on port 3000"));

//Enable Pug
app.set("view engine", "pug");

// Add view folder
app.set("views", path.join(__dirname, "./views"));


app.use("/", routes());
