const fs = require("fs");
const path = require("path");
const ProjectDB = require("../models/project-schema");


// =======================
// GET ALL PROJECTS
// =======================
const getProjects = async (req, res) => {
  try {
    const projects = await ProjectDB.find().sort({ createdAt: 1 });
    res.status(200).json({ projects });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to get projects." });
  }
};


// =======================
// ADD NEW PROJECT
// =======================
const addProject = async (req, res) => {
  try {
    const maxProjects = 15;

    const count = await ProjectDB.countDocuments();
    if (count >= maxProjects) {
      return res.status(400).json({
        message: `Cannot add more than ${maxProjects} projects.`,
      });
    }

    const title = req.body.title || undefined;
    const type = req.body.type || undefined;
    const link = req.body.link || undefined;

    let img = undefined;
    if (req.file) {
      img = `/uploads/${req.file.filename}`;
    }

    const newProject = await ProjectDB.create({
      title,
      type,
      link,
      img,
    });

    res.status(201).json({
      message: "Project added successfully.",
      project: newProject,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to add project." });
  }
};


// =======================
// EDIT PROJECT
// =======================
const editProject = async (req, res) => {
  try {
    const { id } = req.params;
    const title = req.body.title;
    const type = req.body.type;
    const link = req.body.link;

    const existingProject = await ProjectDB.findById(id);
    if (!existingProject)
      return res.status(404).json({ message: "Project not found." });

    // Handle image update
    let img = existingProject.img;
    if (req.file) {
      img = `/uploads/${req.file.filename}`;

      // delete old image if not default
      if (!existingProject.img.includes("project-default-img.png")) {
        const oldPath = path.join(__dirname, "..", existingProject.img);
        if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
      }
    }

    existingProject.title = title || existingProject.title;
    existingProject.type = type || existingProject.type;
    existingProject.link = link || existingProject.link;
    existingProject.img = img;

    const updatedProject = await existingProject.save();

    res.status(200).json({
      message: "Project updated successfully.",
      project: updatedProject,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to update project." });
  }
};


// =======================
// DELETE PROJECT
// =======================
const deleteProject = async (req, res) => {
  try {
    const { id } = req.params;

    const project = await ProjectDB.findById(id);
    if (!project)
      return res.status(404).json({ message: "Project not found." });

    // delete image if not default
    if (!project.img.includes("project-default-img.png")) {
      const oldPath = path.join(__dirname, "..", project.img);
      if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
    }

    await ProjectDB.findByIdAndDelete(id);

    res.status(200).json({
      message: "Project deleted successfully.",
      project,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to delete project." });
  }
};


module.exports = {
  getProjects,
  addProject,
  editProject,
  deleteProject,
};
