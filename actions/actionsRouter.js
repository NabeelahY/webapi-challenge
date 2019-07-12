const express = require("express");
const Action = require("../data/helpers/actionModel");
const router = express.Router();

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

module.exports = router;