const Projects = require("../models/Projects");
const Tasks = require("../models/Tasks");

exports.addTask = async (req, res, next) => {
  // obtain actual project
  const project = await Projects.findOne({ where: { url: req.params.url } });

  // read input value
  const { task } = req.body;

  // status 0 = incompleto y ID de Proyecto
  const status = 0;
  const projectId = project.id;

  // Insertar en la base de datos
  const result = await Tasks.create({ task, status, projectId });

  if (!result) {
    return next();
  }

  // redirect
  res.redirect(`/projects/${req.params.url}`);
};

exports.changeStatusTask = async (req, res) => {
  const { id } = req.params;
  const task = await Tasks.findOne({ where: { id } });

  // change status
  let status = 0;
  if (task.status === status) {
    status = 1;
  }
  task.status = status;

  const result = await task.save();

  if (!result) return next();

  res.status(200).send("Updated");
};

exports.deleteTask = async (req, res) => {
  const { id } = req.params;

  // Delete task
  const result = await Tasks.destroy({ where: { id } });

  if (!result) return next();

  res.status(200).send("Task Deleted Sucessfully");
};
