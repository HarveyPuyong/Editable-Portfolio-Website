const fs = require('fs');
const path = require('path');
const ExperienceDB = require('../models/experience-schema');


// =======================
// GET ALL EXPERIENCES
// =======================
const getExperiences = async (req, res) => {
  try {
    const experiences = await ExperienceDB.find().sort({ createdAt: -1 }); // newest first
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
    // Check current number of experiences
    const count = await ExperienceDB.countDocuments();
    if (count >= 6) {
      return res.status(400).json({
        message: "Cannot add more than 6 experiences.",
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
    const title = req.body.title;
    const company = req.body.company;
    const dateRange = req.body.dateRange;
    const details = req.body.details;

    const existingExperience = await ExperienceDB.findById(id);
    if (!existingExperience)
      return res.status(404).json({ message: "Experience not found." });

    // Handle image update
    let img = existingExperience.img;
    if (req.file) {
      img = `/uploads/${req.file.filename}`;

      // delete old image if not default
      if (!existingExperience.img.includes("experience-default-img.png")) {
        const oldPath = path.join(__dirname, "..", existingExperience.img);
        if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
      }
    }

    existingExperience.title = title || existingExperience.title;
    existingExperience.company = company || existingExperience.company;
    existingExperience.dateRange = dateRange || existingExperience.dateRange;
    existingExperience.details = details || existingExperience.details;
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
    if (!experience.img.includes("experience-default-img.png")) {
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
