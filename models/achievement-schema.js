const mongoose = require("mongoose");

const achievementSchema = new mongoose.Schema(
  {
    number: {
      type: String, // image URL or file path
      default: "Number",
      required: false,
    },

    name: {
      type: String,
      default: "Achievement Name",
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true, // adds createdAt & updatedAt
  }
);

module.exports = mongoose.model("Achivement", achievementSchema);
