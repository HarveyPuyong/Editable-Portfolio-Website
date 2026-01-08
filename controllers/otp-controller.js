const OtpDB = require("../models/otp-schema");
const User = require("../models/user-schema");
const sendEmail = require("../utils/emailer");


// =======================
// SEND OTP
// =======================
const sendOtp = async (req, res) => {
  try {
    // Find User
    const user = await User.findOne();
    if (!user) return res.status(404).json({ message: "User not found" });

    // Generate random 6-digit OTP
    const otpCode = Math.floor(100000 + Math.random() * 900000).toString();

    // Delete any existing OTP before creating a new one
    await OtpDB.deleteMany({}); 

    // Save new OTP
    await OtpDB.create({ otp: otpCode });

    // Send email
    await sendEmail(
      user.email,
      "Your OTP Code",
      `Your OTP is ${otpCode}. It will expire in 15 minutes.`
    );

    res.status(200).json({ message: `OTP sent successfully to ${user.email}` });

  } catch (error) {
    console.error("Error sending OTP:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// =======================
// VERIFY OTP
// =======================
const verifyOtp = async (req, res) => {
  const { otp } = req.body;

  try {
    if (!otp) return res.status(400).json({ message: "OTP is required" });
    
    const validOtp = await OtpDB.findOne({ otp });
    if (!validOtp) return res.status(400).json({ message: "Invalid or expired OTP" });
    
    res.status(200).json({ message: "OTP verified successfully" });

  } catch (error) {
    console.error("Error verifying OTP:", error);
    res.status(500).json({ message: "Internal Server Error: Cannot verify OTP" });
  }
};


module.exports = {sendOtp, verifyOtp};