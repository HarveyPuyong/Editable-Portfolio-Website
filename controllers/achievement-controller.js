const AchievementDB = require('../models/achievement-schema');


// =======================
// GET ALL ACHIEVEMENTS
// =======================
const getAchievements = async (req, res) => {
  try {
    const achievements = await AchievementDB.find().sort({ createdAt: 1 }); // sort by number ascending
    res.status(200).json({ achievements });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to get achievements." });
  }
};


// =======================
// ADD NEW ACHIEVEMENT
// =======================
const addAchievement = async (req, res) => {
  try {
    // Check current number of experiences
    const count = await AchievementDB.countDocuments();
    const maxNum = 4;
    
    if (count >= maxNum) {
      return res.status(400).json({
        message: `Cannot add more than ${maxNum} achievements.`,
      });
    }

    const number = req.body.number || undefined; 
    const name = req.body.name || undefined; 

    const newAchievement = await AchievementDB.create({ number, name });

    res.status(201).json({
      message: "Achievement added successfully.",
      achievement: newAchievement,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to add achievement." });
  }
};


// =======================
// EDIT ACHIEVEMENT
// =======================
const editAchievement = async (req, res) => {
  try {
    const { id } = req.params;
    const { number, name } = req.body;

    const updatedAchievement = await AchievementDB.findByIdAndUpdate(
      id,
      { number, name },
      { new: true } // return updated document
    );

    if (!updatedAchievement)
      return res.status(404).json({ message: "Achievement not found." });

    res.status(200).json({
      message: "Achievement updated successfully.",
      achievement: updatedAchievement,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to update achievement." });
  }
};


// =======================
// DELETE ACHIEVEMENT
// =======================
const deleteAchievement = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedAchievement = await AchievementDB.findByIdAndDelete(id);

    if (!deletedAchievement)
      return res.status(404).json({ message: "Achievement not found." });

    res.status(200).json({
      message: `Achievement ${deletedAchievement.name} deleted successfully`,
      achievement: deletedAchievement,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to delete achievement." });
  }
};


module.exports = {
  getAchievements,
  addAchievement,
  editAchievement,
  deleteAchievement,
};
