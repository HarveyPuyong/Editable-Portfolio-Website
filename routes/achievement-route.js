const express = require('express');
const router = express.Router();
const verifyJWT = require('../middlewares/verify-jwt');

const { getAchievements, addAchievement, editAchievement, deleteAchievement} = require('../controllers/achievement-controller');



// =======================
// GET ALL ACHIEVEMENTS
// =======================
router.get('/', getAchievements);

// =======================
// ADD NEW ACHIEVEMENT
// =======================
router.post('/add', verifyJWT, addAchievement);

// =======================
// EDIT ACHIEVEMENT
// =======================
router.put('/edit/:id', verifyJWT, editAchievement);

// =======================
// DELETE ACHIEVEMENT
// =======================
router.delete('/delete/:id', verifyJWT, deleteAchievement);

module.exports = router;
