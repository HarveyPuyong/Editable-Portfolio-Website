const mongoose = require("mongoose");

const mainInfoSchema = new mongoose.Schema(
  {
    profileImage: {
      type: String,
      default: "uploads/default/default-profile-img.png",
      required: false,
    },

    workAvailability: {
      type: String,
      enum: ["available", "unavailable"],
      default: "unavailable",             
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
      select: false,
    },

    instagramLink: {
      type: String,
      required: false,
      default: "#"
    },

    tiktokLink: {
      type: String,
      required: false,
      default: "#"
    },

    youtubeLink: {
      type: String,
      required: false,
      default: "#"
    },
    
    facebookLink: {
      type: String,
      required: false,
      default: "#"
    },
  },
  {
    timestamps: true, 
  }
);

module.exports = mongoose.model("MainInfo", mainInfoSchema);
