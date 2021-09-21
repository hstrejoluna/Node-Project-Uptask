const Projects = require("../models/Projects");
const Tasks = require("../models/Tasks");

exports.projectHome = async (req, res) => {
  const projects = await Projects.findAll();
  res.render("index", {
    pageName: "Projects",
    projects,
  });
};

////////////////////////////////////////////////////////////////////////////////////////////
//Form
exports.formProject = async (req, res) => {
  const projects = await Projects.findAll();

  res.render("newProject", {
    pageName: "New Project",
    projects,
  });

  res.render("newProject", { pageName: "New Project" });
};

////////////////////////////////////////////////////////////////////////////////////////////
// New Project
exports.newProject = async (req, res) => {
  const projects = await Projects.findAll();

  // validate input fullfillment
  const name = req.body.name;
  let errors = [];

  if (!name) {
    errors.push({ 'text': "Please add a name" });
  }

  if (errors.length > 0) {
    res.render("newProject", {
      pageName: "New Project",
      errors,
      projects,
    });
  } else {
    await Projects.create({ name });
    res.redirect("/");
  }
};

////////////////////////////////////////////////////////////////////////////////////////////
//Project by Url

exports.projectByUrl = async (req, res, next) => {
  const projectsPromise = Projects.findAll();
  const projectPromise = Projects.findOne({
    where: {
      url: req.params.url,
    },
  });
  const [projects, project] = await Promise.all([
    projectsPromise,
    projectPromise,
  ]);

  const tasks = await Tasks.findAll({
    where: {
      projectId: project.id,
    },
  });

  if (!project) return next();

  // Render to view

  res.render("tasks", {
    pageName: "Project Tasks",
    project,
    projects,
    tasks
  });
};

////////////////////////////////////////////////////////////////////////////////////////////
// Edit Project

exports.formEdit = async (req, res) => {
  const projectsPromise = Projects.findAll();
  const projectPromise = Projects.findOne({
    where: {
      id: req.params.id,
    },
  });
  const [projects, project] = await Promise.all([
    projectsPromise,
    projectPromise,
  ]);
  // Render to view
  res.render("newProject", {
    pageName: "Edit Project",
    projects,
    project,
  });
};

////////////////////////////////////////////////////////////////////////////////////////////
// Update Project
exports.updateProject = async (req, res) => {
  const projects = await Projects.findAll();

  // validate input fullfillment
  const name = req.body.name;
  let errors = [];

  if (!name) {
    errors.push({ text: "Please add a name" });
  }

  if (errors.length > 0) {
    res.render("newProject", {
      pageName: "New Project",
      errors,
      projects,
    });
  } else {
    await Projects.update({ name: name }, { where: { id: req.params.id } });
    res.redirect("/");  
  }
};

////////////////////////////////////////////////////////////////////////////////////////////
// Delete Project
exports.deleteProject = async (req, res, next) => {
  const { urlProject } = req.query;
  const result = await Projects.destroy({ where: { url: urlProject } });
  if (!result) {
    return next();
  }
  res.status(200).send("Project Deleted Sucessfully");
};
