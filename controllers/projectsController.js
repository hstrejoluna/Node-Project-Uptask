const Projects = require("../models/Projects");

exports.projectHome = (req, res) => {
  res.render("index", { pageName: "Projects" });
};

exports.formProject = (req, res) => {
  res.render("newProject", { pageName: "New Project" });
};

exports.newProject = async (req, res) => {
  const { name } = req.body;

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
    const url = slug(name).toLowerCase();
    const project = await Projects.create({ name, url });
    res.redirect("/");
  }
};
