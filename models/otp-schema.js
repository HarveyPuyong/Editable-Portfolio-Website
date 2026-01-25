const mongoose = require("mongoose");

const otpSchema = new mongoose.Schema({
  otp: {
    type: String,
    required: true
  },
  lastSentAt: {
    type: Date,
    required: true
  },
  expiresAt: {              // new field for clarity
    type: Date,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 900 // automatic deletion after 15 minutes
  }
});

module.exports = mongoose.model("Otp", otpSchema);
