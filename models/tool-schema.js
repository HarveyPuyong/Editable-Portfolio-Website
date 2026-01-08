const mongoose = require("mongoose");

const toolSchema = new mongoose.Schema(
  {
    img: {
      type: String, // image URL or file path
      default: "tool-default-img",
    },

    name: {
      type: String,
      default: "Tool Name",
      required: true,
      trim: true,
    },

    details: {
      type: String,
      default: "About this tool",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Tool", toolSchema);
