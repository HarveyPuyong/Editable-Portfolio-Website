const mongoose = require("mongoose");

const achievementSchema = new mongoose.Schema(
  {
    number: {
      type: Number, // image URL or file path
      default: "Achivement Number",
      required: false,
    },

    name: {
      type: String,
      default: "Achivement Name",
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true, // adds createdAt & updatedAt
  }
);

module.exports = mongoose.model("Achivement", achievementSchema);
