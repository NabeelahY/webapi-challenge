const Action = require("../data/helpers/actionModel");
module.exports = {
    validateAction,
    validateActionId
}
async function validateAction(req, res, next) {
  const { description, notes } = req.body;
  if (!req.body) {
    return res.status(400).json({ message: "Missing action data" });
  }
  if (!description || !notes) {
    return res
      .status(400)
      .json({ message: "Description and notes are required" });
  }
  next();
}

async function validateActionId(req, res, next) {
    const { id } = req.params;
  
    if (isNaN(Number(id))) {
      return res.status(400).json({ message: "IDs should be a numerical value" });
    }
  
    const action = await Action.get(id);
  
    if (!action) {
      return res.status(404).json({ message: "Action ID does not exist" });
    } else {
      req.action = action;
      next();
    }
  }
  
