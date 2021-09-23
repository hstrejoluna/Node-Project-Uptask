const express = require("express");
const router = express.Router();
// import express validator
const { body } = require("express-validator/check");

// import controller
const projectsController = require("../controllers/projectsController");
const tasksController = require("../controllers/tasksController");
const usersController = require("../controllers/usersController");
const authController = require("../controllers/authController");

module.exports = function () {
  router.get("/", projectsController.projectsHome);
  router.get("/new-project", projectsController.formProject);
  router.post(
    "/new-project",
    body("name").not().isEmpty().trim().escape(),
    projectsController.newProject
  );

  //////////////////////////////////////////////////////////////////////////////////////////////
  //Projects

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
  router.delete("/projects/:url/:id", projectsController.deleteProject);

  ////////////////////////////////////////////////////////////////////////////////

  // Tasks
  router.post("/projects/:url", tasksController.addTask);

  // Update task
  router.patch("/tasks/:id", tasksController.changeStatusTask);

  // Delete task
  router.delete("/tasks/:id", tasksController.deleteTask);

  ////////////////////////////////////////////////////////////////////////////////

  // Users

  // Create New Account (Sign Up)
  router.get("/signup", usersController.formSignup);
  router.post("/signup", usersController.signUp);

  // Login
  router.get("/login", usersController.formLogin);
  router.post("/login", authController.authUser);

  return router;
};
