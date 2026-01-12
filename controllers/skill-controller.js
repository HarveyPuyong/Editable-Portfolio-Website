const SkillDB = require('../models/skill-schema');

// =======================
// GET ALL SKILLS
// =======================
const getSkills = async (req, res) => {
  try {
    const skills = await SkillDB.find().sort({ skillName: 1 }); // sort alphabetically
    res.status(200).json({ skills });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to get skills." });
  }
};

// =======================
// ADD NEW SKILL
// =======================
const addSkill = async (req, res) => {
  try {
    // Check current number of skills
    const count = await SkillDB.countDocuments();
    const maxSkills = 6;

    if (count >= maxSkills) {
      return res.status(400).json({
        message: `Cannot add more than ${maxSkills} skills.`,
      });
    }

    // Get skill from request
    let { skillName } = req.body;

    if (!skillName) {
      return res.status(400).json({ message: "Skill name is required." });
    }

    // Trim whitespace
    skillName = skillName.trim();

    // Check duplicate
    const exists = await SkillDB.findOne({ skillName });
    if (exists) {
      return res.status(400).json({ message: "Skill already exists." });
    }

    const newSkill = await SkillDB.create({ skillName });

    res.status(201).json({
      message: "Skill added successfully.",
      skill: newSkill,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to add skill." });
  }
};

// =======================
// EDIT SKILL
// =======================
const editSkill = async (req, res) => {
  try {
    const { id } = req.params;
    let { skillName } = req.body;

    if (!skillName) {
      return res.status(400).json({ message: "Skill name is required." });
    }

    skillName = skillName.trim();

    // Check duplicate
    const exists = await SkillDB.findOne({ skillName, _id: { $ne: id } });
    if (exists) {
      return res.status(400).json({ message: "Another skill with this name already exists." });
    }

    const updatedSkill = await SkillDB.findByIdAndUpdate(
      id,
      { skillName },
      { new: true }
    );

    if (!updatedSkill)
      return res.status(404).json({ message: "Skill not found." });

    res.status(200).json({
      message: "Skill updated successfully.",
      skill: updatedSkill,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to update skill." });
  }
};

// =======================
// DELETE SKILL
// =======================
const deleteSkill = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedSkill = await SkillDB.findByIdAndDelete(id);

    if (!deletedSkill)
      return res.status(404).json({ message: "Skill not found." });

    res.status(200).json({
      message: `Skill ${deletedSkill.skillName} deleted successfully`,
      skill: deletedSkill,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to delete skill." });
  }
};

module.exports = {
  getSkills,
  addSkill,
  editSkill,
  deleteSkill,
};
