const fs = require('fs');
const path = require('path');
const ExperienceDB = require('../models/experience-schema');


// =======================
// GET ALL EXPERIENCES
// =======================
const getExperiences = async (req, res) => {
  try {
    const experiences = await ExperienceDB.find().sort({ createdAt: 1 }); // newest first
    res.status(200).json({ experiences });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to get experiences." });
  }
};


// =======================
// ADD NEW EXPERIENCE
// =======================
const addExperience = async (req, res) => {
  try {
    const count = await ExperienceDB.countDocuments();
    const maxExperience = 10;

    if (count >= maxExperience) {
      return res.status(400).json({
        message: `Cannot add more than ${maxExperience} experiences.`,
      });
    }

    const title = req.body.title || undefined; // undefined → Mongoose default
    const company = req.body.company || undefined;
    const dateRange = req.body.dateRange || undefined;
    const details = req.body.details || undefined;

    let img = undefined;
    if (req.file) {
      img = `/uploads/${req.file.filename}`;
    }

    const newExperience = await ExperienceDB.create({
      title,
      company,
      dateRange,
      details,
      img,
    });

    res.status(201).json({
      message: "Experience added successfully.",
      experience: newExperience,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to add experience." });
  }
};


// =======================
// EDIT EXPERIENCE
// =======================
const editExperience = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, company, dateRange, details } = req.body;

    const existingExperience = await ExperienceDB.findById(id);
    if (!existingExperience)
      return res.status(404).json({ message: "Experience not found." });

    // Handle image update
    let img = existingExperience.img;
    if (req.file) {
      img = `/uploads/${req.file.filename}`;

      if (
        existingExperience.img &&
        !existingExperience.img.includes("uploads/default/default-image.png")
      ) {
        const oldPath = path.join(__dirname, "..", existingExperience.img);
        if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
      }
    }

    if (title !== undefined) existingExperience.title = title;
    if (company !== undefined) existingExperience.company = company;
    if (dateRange !== undefined) existingExperience.dateRange = dateRange;
    if (details !== undefined) existingExperience.details = details;

    existingExperience.img = img;

    const updatedExperience = await existingExperience.save();

    res.status(200).json({
      message: "Experience updated successfully.",
      experience: updatedExperience,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to update experience." });
  }
};



// =======================
// DELETE EXPERIENCE
// =======================
const deleteExperience = async (req, res) => {
  try {
    const { id } = req.params;

    const experience = await ExperienceDB.findById(id);
    if (!experience)
      return res.status(404).json({ message: "Experience not found." });

    // delete image if not default
    if (!experience.img.includes("uploads/default/default-image.png")) {
      const oldPath = path.join(__dirname, "..", experience.img);
      if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
    }

    await ExperienceDB.findByIdAndDelete(id);

    res.status(200).json({
      message: "Experience deleted successfully.",
      experience,
    });
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to delete experience." });
  }
};



module.exports = {
  getExperiences,
  addExperience,
  editExperience,
  deleteExperience,
};
