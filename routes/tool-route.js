const express = require("express");
const router = express.Router();
const verifyJWT = require("../middlewares/verify-jwt");
const upload = require("../middlewares/upload-file");

const {
  getTools,
  addTool,
  editTool,
  deleteTool,
} = require("../controllers/tool-controller");


// ============= GET ALL TOOLS ============= //
router.get("/", getTools);

// ============= ADD TOOL ================== //
router.post(
  "/add",
  verifyJWT,
  upload.single("img"),
  addTool
);

// ============= EDIT TOOL ================= //
router.put(
  "/edit/:id",
  verifyJWT,
  upload.single("img"), // optional image
  editTool
);

// ============= DELETE TOOL =============== //
router.delete(
  "/delete/:id",
  verifyJWT,
  deleteTool
);

module.exports = router;
