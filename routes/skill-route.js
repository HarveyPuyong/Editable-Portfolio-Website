const express = require('express');
const router = express.Router();
const verifyJWT = require('../middlewares/verify-jwt');

const {
  getSkills,
  addSkill,
  editSkill,
  deleteSkill
} = require('../controllers/skill-controller');


// ====================== GET ALL SKILLS ======================= //
router.get('/', getSkills);


// ====================== ADD NEW SKILL ======================= //
router.post('/add', verifyJWT, addSkill);


// ====================== EDIT SKILL ======================= //
router.put('/edit/:id', verifyJWT, editSkill);


// ====================== DELETE SKILL ======================= //
router.delete('/delete/:id', verifyJWT, deleteSkill);


module.exports = router;
