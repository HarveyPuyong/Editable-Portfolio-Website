const crypto = require("crypto");
const OtpDB = require("../models/otp-schema");
const ResetToken = require("../models/reset-password-token-schema");
const User = require("../models/user-schema");
const { otpEmailer } = require("../utils/emailer");

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
          message: `Please wait ${Math.ceil(COOLDOWN_SECONDS - diff)} seconds`
        });
      }

      await existingOtp.deleteOne();
    }

    const otpCode = Math.floor(100000 + Math.random() * 900000).toString();

    await OtpDB.create({
      otp: otpCode,
      lastSentAt: new Date(),
      expiresAt: new Date(Date.now() + 15 * 60 * 1000)
    });

    await otpEmailer(
      user.email,
      "Your OTP Code",
      `Your OTP is ${otpCode}. It will expire in 15 minutes.`
    );

    res.status(200).json({ message: `OTP sent successfully to ${user.email}` });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

// =======================
// VERIFY OTP
// =======================
const verifyOtp = async (req, res) => {
  try {
    const { otp } = req.body;

    const validOtp = await OtpDB.findOne({ otp });
    if (!validOtp || validOtp.expiresAt < Date.now()) {
      if (validOtp) await validOtp.deleteOne();
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }

    // OTP is consumed
    await validOtp.deleteOne();

    // Issue temporary reset token
    const resetToken = crypto.randomUUID();

    await ResetToken.create({
      token: resetToken,
      expiresAt: new Date(Date.now() + 5 * 60 * 1000) // 5 minutes
    });

    res.status(200).json({
      message: `OTP verified successfully`,
      resetToken
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "OTP verification failed" });
  }
};

module.exports = { sendOtp, verifyOtp };
