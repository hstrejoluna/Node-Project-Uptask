const express = require("express");
const routes = require("./routes");
const app = express();


app.listen(3000, () => console.log("Server started on port 3000"));


app.use("/", routes());
