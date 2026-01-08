const mongoose = require("mongoose");

const mainInfoSchema = new mongoose.Schema(
  {
    profileImage: {
      type: String, // image URL or file path
      default: "uploads/default-profile-img.png",
      required: false,
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

    socialLinks: {
      instagram: {
        type: String,
        required: false,
      },
      tiktok: {
        type: String,
        required: false,
      },
      youtube: {
        type: String,
        required: false,
      },
      facebook: {
        type: String,
        required: false,
      },
    },
  },
  {
    timestamps: true, // adds createdAt & updatedAt
  }
);

module.exports = mongoose.model("MainInfo", mainInfoSchema);
