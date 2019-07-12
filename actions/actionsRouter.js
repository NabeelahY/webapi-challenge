const express = require("express");
const Action = require("../data/helpers/actionModel");
const router = express.Router();
const { actionMiddleware } = require("../middleware");

router.get("/", async (req, res) => {
  try {
    const actions = await Action.get();
    res.status(200).json(actions);
  } catch (error) {
    res.status(500).json({
      message: "Error retrieving actions"
    });
  }
});

router.get("/:id", actionMiddleware.validateActionId, async (req, res) => {
  try {
    const { id } = req.params;
    const action = await Action.get(id);
    res.status(200).json(action);
  } catch (error) {
    res.status(500).json({
      message: "Error retrieving action"
    });
  }
});

router.put("/:id", actionMiddleware.validateActionId, async (req, res) => {
  try {
    await Action.update(req.params.id, req.body);
    const editedAction = await Action.get(req.params.id);
    res.status(200).json(editedAction);
  } catch (error) {
    res.status(500).json({
      message: "Error editing the action"
    });
  }
});

router.delete("/:id", actionMiddleware.validateActionId, async (req, res) => {
  try {
    const { id } = req.params;
    await Action.remove(id);
    res.status(200).json({ deleted_action: req.action });
  } catch (error) {
    res.status(500).json({
      message: "Error deleting the action"
    });
  }
});

module.exports = router;
