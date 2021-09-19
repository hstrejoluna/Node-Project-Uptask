const express = require("express");
const router = express.Router();
const projectsController = require("../controllers/projectsController");
// import express validator
const { body } = require("express-validator");

module.exports = function () {
  router.get("/", projectsController.projectHome);
  router.get("/new-project", projectsController.formProject);
  router.post(
    "/new-project",
    body("name").not().isEmpty().trim().escape(),
    projectsController.newProject
  );

  // List projects
  router.get("/projects/:url", projectsController.projectByUrl);
  return router;
};
