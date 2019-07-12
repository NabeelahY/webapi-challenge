const express = require("express");
const Project = require("../data/helpers/projectModel");
const router = express.Router();
const { validateProject } = require("../middleware");

router.get("/", async (req, res) => {
  try {
    const projects = await Project.get();
    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({
      message: "Error retrieving projects"
    });
  }
});

router.post("/", validateProject, async (req, res) => {
  try {
    const { body } = req;
    const newProject = await Project.insert(body);
    res.status(201).json(newProject);
  } catch (error) {
    res.status(500).json({
      message: "Error creating project"
    });
  }
});

module.exports = router;
