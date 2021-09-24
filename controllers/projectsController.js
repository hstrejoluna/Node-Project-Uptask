const Projects = require("../models/Projects");
const Tasks = require("../models/Tasks");

exports.projectsHome = async (req, res) => {
  const userId = res.locals.user.id;
  const projects = await Projects.findAll({ where: { userId } });
  res.render("index", {
    pageName: "Projects",
    projects,
  });
};

////////////////////////////////////////////////////////////////////////////////////////////
//Form
exports.formProject = async (req, res) => {
  const userId = res.locals.user.id;
  const projects = await Projects.findAll({ where: { userId } });

  res.render("newProject", {
    pageName: "New Project",
    projects,
  });
};

////////////////////////////////////////////////////////////////////////////////////////////
// New Project
exports.newProject = async (req, res) => {
  const userId = res.locals.user.id;
  const projects = await Projects.findAll({ where: { userId } });

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
    const userId = res.locals.user.id;
    await Projects.create({ name, userId });
    res.redirect("/");
  }
};

////////////////////////////////////////////////////////////////////////////////////////////
//Project by Url

exports.projectByUrl = async (req, res, next) => {
  const userId = res.locals.user.id;
  const projectsPromise = Projects.findAll({ where: { userId } });
  const projectPromise = Projects.findOne({
    where: {
      url: req.params.url,
      userId,
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
    tasks,
  });
};

////////////////////////////////////////////////////////////////////////////////////////////
// Edit Project

exports.formEdit = async (req, res) => {
  const userId = res.locals.user.id;
  const projectsPromise = Projects.findAll({ where: { userId } });
  const projectPromise = Projects.findOne({
    where: {
      id: req.params.id,
      userId,
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
  const userId = res.locals.user.id;
  const projects = await Projects.findAll({ where: { userId } });

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
  const { urlProject, idProject } = req.query;

  await Tasks.destroy({ where: { projectId: idProject } });
  const result = await Projects.destroy({ where: { url: urlProject } });
  if (!result) {
    return next();
  }
  res.status(200).send("Project Deleted Sucessfully");
};
