const express = require("express");
const Project = require("../data/helpers/projectModel");
const router = express.Router();
const {projectMiddleware}  = require("../middleware");

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

router.get("/:id", projectMiddleware.validateProjectId, async (req, res) => {
  try {
    const { id } = req.params;
    const projects = await Project.get(id);
    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({
      message: "Error retrieving projects"
    });
  }
});
router.get("/:id/actions", projectMiddleware.validateProjectId, async (req, res) => {
  try {
    const { id } = req.params;
    const actions = await Project.getProjectActions(id);
    res.status(200).json(actions);
  } catch (error) {
    res.status(500).json({
      message: "Error retrieving project actions"
    });
  }
});

router.post("/:id", projectMiddleware.validateProject, async (req, res) => {
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

router.put("/:id", projectMiddleware.validateProjectId, async (req, res) => {
  try {
    const { name, description } = req.body;
    await Project.update(req.params.id, { name, description });
    const editedProject = await Project.get(req.params.id);
    res.status(200).json(editedProject);
  } catch (error) {
    res.status(500).json({
      message: "Error editing the project"
    });
  }
});

router.delete("/:id", projectMiddleware.validateProjectId, async (req, res) => {
  try {
    const { id } = req.params;
    await Project.remove(id);
    res.status(200).json({ deleted_project: req.project });
  } catch (error) {
    res.status(500).json({
      message: "Error deleting the project"
    });
  }
});

module.exports = router;
