const fs = require('fs');
const path = require('path');
const mainInfoDB = require("../models/main-info-schema");
const UserDB = require('../models/user-schema');


// =======================
// CHANGE INFO
// =======================
const changeInfo = async (req, res) => {
  try {
    const {
      name,
      aboutMe,
      contactNumber,
      address,
      sendgridApiKey,
      instagramLink,
      tiktokLink,
      youtubeLink,
      facebookLink,
    } = req.body;

    const existingInfo = await mainInfoDB.findOne();

    // =========== HANDLE PROFILE IMAGE ===========//
    let profileImage = existingInfo?.profileImage;

    if (req.files?.profileImage) {
      // Set new profile image path
      profileImage = `/uploads/${req.files.profileImage[0].filename}`;

      // Delete old profile image only if it exists and is not default
      if (
        existingInfo?.profileImage &&
        !existingInfo.profileImage.includes("default-profile-img.png")
      ) {
        const oldImagePath = path.join(__dirname, "..", existingInfo.profileImage);
        if (fs.existsSync(oldImagePath)) fs.unlinkSync(oldImagePath);
      }
    }


    // ============= HANDLE CV FILE ============= //
    let cvFile = existingInfo?.cvFile;

    if (req.files?.cvFile) {
      cvFile = `/uploads/${req.files.cvFile[0].filename}`;

      if (existingInfo?.cvFile) {
        const oldCvPath = path.join(__dirname, "..", existingInfo.cvFile);
        if (fs.existsSync(oldCvPath)) fs.unlinkSync(oldCvPath);
      }
    }


    // ================  UPDATE DATABASE ================ //
    const updatedInfo = await mainInfoDB.findOneAndUpdate(
      {},
      {
        name,
        aboutMe,
        contactNumber,
        address,
        sendgridApiKey,
        profileImage,
        cvFile,
        instagramLink,
        tiktokLink,
        youtubeLink,
        facebookLink
      },
      { new: true, upsert: true }
    );

    res.status(200).json({
      message: "Main info updated successfully.",
      info: updatedInfo,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to update main info." });
  }
};


// =======================
// GET INFO
// =======================
const getInfo = async (req, res) => {
  try {
    const info = await mainInfoDB.findOne(); 

    const user = await UserDB.findOne().select("email -_id"); 

    res.status(200).json({
      info,
      email: user ? user.email : null, 
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error: Cannot get info" });
  }
};


// =======================
// CHANGE EMAIL
// =======================
const changeEmail = async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ message: "Email is required." });

  try {
    const updatedEmail = await UserDB.findOneAndUpdate(
      {},
      { email },
      { new: true }
    ).select("email");

    res.status(200).json({
      email: updatedEmail.email,
      message: "Email updated successfully.",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to update email." });
  }
};




module.exports = { changeInfo, getInfo, changeEmail}