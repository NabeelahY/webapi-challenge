const express = require("express");
const Action = require("../data/helpers/actionModel");
const router = express.Router();
const {actionMiddleware}  = require("../middleware");

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

module.exports = router;