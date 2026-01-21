const fs = require("fs");
const path = require("path");
const ToolDB = require("../models/tool-schema");


// =======================
// GET ALL TOOLS
// =======================
const getTools = async (req, res) => {
  try {
    const tools = await ToolDB.find().sort({ createdAt: 1 });

    res.status(200).json({ tools });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to get tools." });
  }
};


// =======================
// ADD NEW TOOL
// =======================
const addTool = async (req, res) => {
  try {
    const maxTool = 20;
    
    const count = await ToolDB.countDocuments();
    if (count >= maxTool) {
      return res.status(400).json({
        message: `Cannot add more than ${maxTool} tools.`,
      });
    }

    const name = req.body.name || undefined;
    const details = req.body.details || undefined;

    let img = undefined;
    if (req.file) {
      img = `/uploads/${req.file.filename}`;
    }

    const newTool = await ToolDB.create({
      name,
      details,
      img,
    });

    res.status(201).json({
      message: "Tool added successfully.",
      tool: newTool,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to add tool." });
  }
};


// =======================
// EDIT TOOL
// =======================
const editTool = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, details } = req.body;

    const existingTool = await ToolDB.findById(id);
    if (!existingTool)
      return res.status(404).json({ message: "Tool not found." });

    // Handle image update
    let img = existingTool.img;
    if (req.file) {
      img = `/uploads/${req.file.filename}`;

      if (
        existingTool.img &&
        !existingTool.img.includes("tool-default-img")
      ) {
        const oldPath = path.join(__dirname, "..", existingTool.img);
        if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
      }
    }

    // Update fields only if provided
    if (name !== undefined) existingTool.name = name;
    if (details !== undefined) existingTool.details = details;

    existingTool.img = img;

    const updatedTool = await existingTool.save();

    res.status(200).json({
      message: "Tool updated successfully.",
      tool: updatedTool,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to update tool." });
  }
};



// =======================
// DELETE TOOL
// =======================
const deleteTool = async (req, res) => {
  try {
    const { id } = req.params;

    const tool = await ToolDB.findById(id);
    if (!tool)
      return res.status(404).json({ message: "Tool not found." });

    // delete image if not default
    if (
      tool.img &&
      !tool.img.includes("tool-default-img")
    ) {
      const oldPath = path.join(__dirname, "..", tool.img);
      if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
    }

    await ToolDB.findByIdAndDelete(id);

    res.status(200).json({
      message: "Tool deleted successfully.",
      tool,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to delete tool." });
  }
};


module.exports = {
  getTools,
  addTool,
  editTool,
  deleteTool,
};
