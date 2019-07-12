const Project = require("../data/helpers/projectModel");
module.exports = {
    validateProject
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
