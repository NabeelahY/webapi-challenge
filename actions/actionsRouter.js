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

router.post("/", actionMiddleware.validateAction, async (req, res) => {
  try {
    const newAction = await Action.insert(req.body);
    res.status(201).json(newAction);
  } catch (error) {
    res.status(500).json({
      message: "Error creating action"
    });
  }
});

router.put("/:id", actionMiddleware.validateActionId, async (req, res) => {
  try {
    await Action.update(req.params.id, req.body);
    const editedAction = await Action.get(req.params.id);
    res.status(200).json(editedAction);
  } catch (error) {
      console.log(error)
    res.status(500).json({
      message: "Error editing the action"
    });
  }
});

module.exports = router;
