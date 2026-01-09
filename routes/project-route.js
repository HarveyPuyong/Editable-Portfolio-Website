const express = require("express");
const router = express.Router();
const verifyJWT = require("../middlewares/verify-jwt");
const upload = require("../middlewares/upload-file");

const {
  getProjects,
  addProject,
  editProject,
  deleteProject,
} = require("../controllers/project-controller");


// ============= GET ALL PROJECTS ============= //
router.get("/", getProjects);

// ============= ADD PROJECT ================== //
router.post(
  "/add",
  verifyJWT,
  upload.single("img"),
  addProject
);

// ============= EDIT PROJECT ================= //
router.put(
  "/edit/:id",
  verifyJWT,
  upload.single("img"), // optional image
  editProject
);

// ============= DELETE PROJECT =============== //
router.delete(
  "/delete/:id",
  verifyJWT,
  deleteProject
);


module.exports = router;
