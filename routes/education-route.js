const express = require("express");
const router = express.Router();
const verifyJWT = require("../middlewares/verify-jwt");

const {
  getEducations,
  addEducation,
  editEducation,
  deleteEducation,
} = require("../controllers/education-controller");


// ============= GET ALL EDUCATION ============= //
router.get("/", getEducations);

// ============= ADD EDUCATION ================ //
router.post(
  "/add",
  verifyJWT,
  addEducation
);

// ============= EDIT EDUCATION =============== //
router.put(
  "/edit/:id",
  verifyJWT,
  editEducation
);

// ============= DELETE EDUCATION ============= //
router.delete(
  "/delete/:id",
  verifyJWT,
  deleteEducation
);

module.exports = router;
