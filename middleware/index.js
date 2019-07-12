const Project = require("../data/helpers/projectModel");
module.exports = {
    validateProject,
    validateProjectId
}
async function validateProject(req, res, next) {
  const { name, description } = req.body;
  if (!req.body) {
    return res.status(400).json({ message: "Missing project data" });
  }
  if (!name || !description) {
    return res
      .status(400)
      .json({ message: "Name and description are required" });
  }
  next();
}

async function validateProjectId(req, res, next) {
    const { id } = req.params;
  
    if (isNaN(Number(id))) {
      return res.status(400).json({ message: "IDs should be a numerical value" });
    }
  
    const project = await Project.get(id);
  
    if (!project) {
      return res.status(404).json({ message: "Invalid project id" });
    } else {
      req.project = project;
      next();
    }
  }
  
