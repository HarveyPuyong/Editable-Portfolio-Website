const mongoose = require("mongoose");

const skillSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      unique: true, 
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Skill", skillSchema);
