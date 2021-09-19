const Projects = require("../models/Projects");

exports.projectHome = async (req, res) => {
  const projects = await Projects.findAll();
  res.render("index", {
    pageName: "Projects",
    projects,
  });
};

exports.formProject = (req, res) => {
  res.render("newProject", { pageName: "New Project" });
};

exports.newProject = async (req, res) => {
  const { name, url } = req.body;

  let errors = [];

  if (!name) {
    errors.push({ text: "Please add a name" });
  }

  if (errors.length > 0) {
    res.render("newProject", {
      pageName: "New Project",
      errors,
    });
  } else {
    const project = await Projects.create({ name, url });
    res.redirect("/");
  }
};

exports.projectByUrl = async (req, res) => {
  const project = await Projects.findOne({
    where: {
      url: req.params.url,
    },
  });

  if (!project) return next();

  // Render to view

  res.render("tasks", {
    pageName: "Project Tasks",
    project,
  });
};
