const express = require("express");
const router = express.Router();

// import controller
const projectsController = require("../controllers/projectsController");
const tasksController = require("../controllers/tasksController");

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

  // Update project
  router.get("/project/edit/:id", projectsController.formEdit);
  router.post(
    "/new-project/:id",
    body("name").not().isEmpty().trim().escape(),
    projectsController.updateProject
  );

  // Delete project
  router.delete("/projects/:url", projectsController.deleteProject);

  // Tasks
  router.post("/projects/:url", tasksController.addTask);

  return router;
};
