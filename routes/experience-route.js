const express = require('express');
const router = express.Router();
const verifyJWT = require('../middlewares/verify-jwt');
const upload = require('../middlewares/upload-file'); 
const {
  getExperiences,
  addExperience,
  editExperience,
  deleteExperience,
} = require('../controllers/experience-controller');


// ============= GET ALL EXPERIENCES ============= //
router.get('/', getExperiences);

// ============= ADD EXPERIENCE ======================= //
router.post(
  '/add',
  verifyJWT,
  upload.single('img'), 
  addExperience
);

// ============= EDIT EXPERIENCE ============= //
router.put(
  '/edit/:id',
  verifyJWT,
  upload.single('img'), // optional image
  editExperience
);

// ============= DELETE EXPERIENCE ============= //
router.delete('/delete/:id', verifyJWT, deleteExperience);


module.exports = router;
