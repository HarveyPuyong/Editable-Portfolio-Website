const OtpDB = require("../models/otp-schema");
const User = require("../models/user-schema");
const {otpEmailer} = require("../utils/emailer");

// =======================
// SEND OTP
// =======================
const sendOtp = async (req, res) => {
  const COOLDOWN_SECONDS = 60;

  try {
    const user = await User.findOne();
    if (!user) return res.status(404).json({ message: "User not found" });

    const existingOtp = await OtpDB.findOne();

    if (existingOtp) {
      const diff = (Date.now() - existingOtp.lastSentAt.getTime()) / 1000;

      if (diff < COOLDOWN_SECONDS) {
        return res.status(429).json({
          message: `Please wait ${Math.ceil(
            COOLDOWN_SECONDS - diff
          )} seconds before requesting another OTP`
        });
      }

      await existingOtp.deleteOne(); // remove old OTP
    }

    const otpCode = Math.floor(100000 + Math.random() * 900000).toString();

    await OtpDB.create({
      otp: otpCode,
      lastSentAt: new Date(),
      expiresAt: new Date(Date.now() + 15 * 60 * 1000) // 15 mins
    });

    await otpEmailer(
      user.email,
      "Your OTP Code",
      `Your OTP is ${otpCode}. It will expire in 15 minutes.`
    );

    res.status(200).json({
      message: "OTP sent successfully",
      cooldown: COOLDOWN_SECONDS
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// =======================
// VERIFY OTP
// =======================
const verifyOtp = async (req, res) => {
  const { otp } = req.body;

  try {
    if (!otp)
      return res.status(400).json({ message: "OTP is required" });

    const validOtp = await OtpDB.findOne({ otp });

    if (!validOtp || validOtp.expiresAt < Date.now()) {
      if (validOtp) await validOtp.deleteOne(); // remove expired OTP
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }

    await validOtp.deleteOne(); // consume OTP

    res.status(200).json({ message: "OTP verified successfully" });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "OTP verification failed" });
  }
};

module.exports = { sendOtp, verifyOtp };