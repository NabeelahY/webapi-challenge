const Action = require("../data/helpers/actionModel");
const Project = require("../data/helpers/projectModel");
module.exports = {
  validateAction,
  validateActionId
};
async function validateAction(req, res, next) {
  const { description, notes, project_id } = req.body;

  if (!req.body) {
    return res.status(400).json({ message: "Missing action data" });
  }
  const project = await Project.get(project_id);
  if (!project) {
    return res.status(400).json({ message: "Project ID does not exist" });
  }

  if (!description || !notes) {
    return res
      .status(400)
      .json({ message: "Description and notes are required" });
  }
  next();
}

async function validateActionId(req, res, next) {
  try {
    const { id } = req.params;

    if (isNaN(Number(id))) {
      return res
        .status(400)
        .json({ message: "IDs should be a numerical value" });
    }

    const action = await Action.get(id);
    console.log(action);
    if (!Object.keys(action).length) {
      return res.status(404).json({ message: "Action ID does not exist" });
    } else {
      req.action = action;
      next();
    }
  } catch (error) {
    console.log(error);
  }
}
