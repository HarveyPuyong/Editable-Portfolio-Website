const EducationDB = require("../models/education-schema");


// =======================
// GET ALL EDUCATION
// =======================
const getEducations = async (req, res) => {
  try {
    const educations = await EducationDB.find().sort({ createdAt: 1 });

    res.status(200).json({ educations });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to get education." });
  }
};


// =======================
// ADD NEW EDUCATION
// =======================
const addEducation = async (req, res) => {
  try {
    const maxEducation = 15;

    const count = await EducationDB.countDocuments();
    if (count >= maxEducation) {
      return res.status(400).json({
        message: `Cannot add more than ${maxEducation} education.`,
      });
    }

    const title = req.body.title || undefined;
    const institution = req.body.institution || undefined;
    const details = req.body.details || undefined;
    const dateRange = req.body.dateRange || undefined;

    const newEducation = await EducationDB.create({
      title,
      institution,
      details,
      dateRange,
    });

    res.status(201).json({
      message: "Education added successfully.",
      education: newEducation,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to add education." });
  }
};


// =======================
// EDIT EDUCATION
// =======================
const editEducation = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, institution, details, dateRange } = req.body;

    const existingEducation = await EducationDB.findById(id);
    if (!existingEducation)
      return res.status(404).json({ message: "Education not found." });

    // Update fields only if provided
    if (title !== undefined) existingEducation.title = title;
    if (institution !== undefined)
      existingEducation.institution = institution;
    if (details !== undefined) existingEducation.details = details;
    if (dateRange !== undefined)
      existingEducation.dateRange = dateRange;

    const updatedEducation = await existingEducation.save();

    res.status(200).json({
      message: "Education updated successfully.",
      education: updatedEducation,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to update education." });
  }
};



// =======================
// DELETE EDUCATION
// =======================
const deleteEducation = async (req, res) => {
  try {
    const { id } = req.params;

    const education = await EducationDB.findById(id);
    if (!education)
      return res.status(404).json({ message: "Education not found." });

    await EducationDB.findByIdAndDelete(id);

    res.status(200).json({
      message: "Education deleted successfully.",
      education,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to delete education." });
  }
};


module.exports = {
  getEducations,
  addEducation,
  editEducation,
  deleteEducation,
};
