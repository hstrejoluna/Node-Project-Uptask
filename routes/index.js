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
  router.get(
    "/",
    authController.userAuthenticated,
    projectsController.projectsHome
  );
  router.get(
    "/new-project",
    authController.userAuthenticated,
    projectsController.formProject
  );
  router.post(
    "/new-project",
    authController.userAuthenticated,
    body("name").not().isEmpty().trim().escape(),
    projectsController.newProject
  );

  //////////////////////////////////////////////////////////////////////////////////////////////
  //Projects

  // List projects
  router.get(
    "/projects/:url",
    authController.userAuthenticated,
    projectsController.projectByUrl
  );

  // Update project
  router.get(
    "/project/edit/:id",
    authController.userAuthenticated,
    projectsController.formEdit
  );
  router.post(
    "/new-project/:id",
    authController.userAuthenticated,
    body("name").not().isEmpty().trim().escape(),
    projectsController.updateProject
  );

  // Delete project
  router.delete(
    "/projects/:url/:id",
    authController.userAuthenticated,
    projectsController.deleteProject
  );

  ////////////////////////////////////////////////////////////////////////////////

  // Tasks
  router.post(
    "/projects/:url",
    authController.userAuthenticated,
    tasksController.addTask
  );

  // Update task
  router.patch(
    "/tasks/:id",
    authController.userAuthenticated,
    tasksController.changeStatusTask
  );

  // Delete task
  router.delete(
    "/tasks/:id",
    authController.userAuthenticated,
    tasksController.deleteTask
  );

  ////////////////////////////////////////////////////////////////////////////////

  // Users

  // Create New Account (Sign Up)
  router.get("/signup", usersController.formSignup);
  router.post("/signup", usersController.signUp);

  // Login
  router.get("/login", usersController.formLogin);
  router.post("/login", authController.authUser);

  // Logout
  router.get("/logout", authController.logOut);

  // Reset Password
  router.get("/reset", usersController.formResetpassword);
  router.post("/reset", authController.sendToken);
  router.get("/reset/:token", authController.resetPassword);
  router.post("/reset/:token", authController.updatePassword);

  return router;
};
