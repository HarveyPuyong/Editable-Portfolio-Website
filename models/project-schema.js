const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema(
  {
    img: {
      type: String, // image URL or file path
      default: "uploads/default/default-image.png",
    },

    title: {
      type: String,
      default: "Project Title",
      required: true,
      trim: true,
    },

    type: {
      type: String, 
      default: "project type",
      required: true,
      trim: true,
    },

    link: {
      type: String, 
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Project", projectSchema);
