const ResetToken = require("../models/reset-password-token-schema");

const verifyResetPasswordToken = async (req, res, next) => {
  try {
    const resetToken = req.headers["password-reset-token"];

    if (!resetToken) {
      return res.status(401).json({ message: "Reset token required" });
    }

    const tokenDoc = await ResetToken.findOne({ token: resetToken });

    if (!tokenDoc || tokenDoc.expiresAt < Date.now()) {
      if (tokenDoc) await tokenDoc.deleteOne();
      return res.status(403).json({ message: "Invalid or expired reset token" });
    }

    // consume token (one-time)
    await tokenDoc.deleteOne();

    next();
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Reset token verification failed" });
  }
};

module.exports = verifyResetPasswordToken;
