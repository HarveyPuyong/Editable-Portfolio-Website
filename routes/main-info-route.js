const express = require('express');
const router = express.Router();
const verifyJWT = require('../middlewares/verify-jwt');
const { changeInfo, getInfo, changeEmail } = require('../controllers/main-info-controller');
const upload = require('../middlewares/upload-file');

// =======================
// GET INFO
// =======================
router.get('/get-info', getInfo); 

// =======================
// CHANGE INFO
// ======================
router.put(
  '/change-info',
  verifyJWT,
  upload.fields([
    { name: 'profileImage', maxCount: 1 }, // para sa profile image
    { name: 'cvFile', maxCount: 1 }        // para sa cv file
  ]),
  changeInfo
);

// =======================
// CHANGE EMAIL
// =======================
router.patch('/change-email', verifyJWT, changeEmail); // Change email


module.exports = router;
