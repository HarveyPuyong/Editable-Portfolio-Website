const mongoose = require("mongoose");

const experienceSchema = new mongoose.Schema(
  {
    img: {
      type: String, // image URL or file path
      default: "uploads/default-image.png",
    },

    title: {
      type: String,
      default: "Title",
      required: true,
      trim: true,
    },

    company: {
      type: String,
      default: "Company or etc..",
      required: true,
      trim: true,
    },

    dateRange: {
      type: String, // e.g. "Jan 2023 - Present",
      default: "2025 - Present",
      required: true,
    },

    details: {
      type: String,
      default: "Experience Details",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Experience", experienceSchema);
