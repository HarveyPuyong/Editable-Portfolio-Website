const mongoose = require("mongoose");

const educationSchema = new mongoose.Schema(
  {
    title: {
      type: String, 
      default: "Education Title",
      required: true,
      trim: true,
    },

    institution: {
      type: String, // school or university name
      default: "School or University name",
      required: true,
      trim: true,
    },

    details: {
      type: String,
      default: "Education Details",
    },

    dateRange: {
      type: String, // e.g. "2019 - 2023"
      default: "2020 - Present",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Education", educationSchema);
