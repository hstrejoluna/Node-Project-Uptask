const express = require("express");
const router = express.Router();
const projectsController = require("../controllers/projectsController");


module.exports = function () {
  router.get("/", projectsController.projectHome);

  router.get("/about", function (req, res) {
    res.send("About");
  });

  return router;
};
