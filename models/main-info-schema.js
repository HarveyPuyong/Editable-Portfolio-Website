const mongoose = require("mongoose");

const mainInfoSchema = new mongoose.Schema(
  {
    profileImage: {
      type: String, // image URL or file path
      default: "uploads/default-profile-img.png",
      required: false,
    },

    workAvailability: {
      type: String,
      enum: ["available", "unavailable"], // limit lang sa valid values
      default: "unavailable",             // default kung walang pinili
      required: true,
    },

    name: {
      type: String,
      required: true,
      trim: true,
    },

    cvFile: {
      type: String, // file URL or path
      required: false,
    },

    aboutMe: {
      type: String,
      required: false,
    },

    contactNumber: {
      type: String,
      required: false,
      default: "No contact no.",
    },

    address: {
      type: String,
      required: false,
      default: "No Adress",
    },

    sendgridApiKey: {
      type: String,
      required: false,
      select: false, // 🔒 hide by default (security)
    },

    instagramLink: {
      type: String,
      required: false,
    },

    tiktokLink: {
      type: String,
      required: false,
    },

    youtubeLink: {
      type: String,
      required: false,
    },
    
    facebookLink: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true, 
  }
);

module.exports = mongoose.model("MainInfo", mainInfoSchema);
