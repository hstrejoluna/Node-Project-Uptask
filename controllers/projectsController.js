exports.projectHome = (req, res) => {
  res.render('index', { pageName: 'Projects' });
};

exports.formProject = (req, res) => {
  res.render('newProject', { pageName: 'Form Project' });

};


exports.about = (req, res) => {
  res.send("About");
};

