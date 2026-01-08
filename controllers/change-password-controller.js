const bcrypt = require("bcrypt");
const UserDB = require("../models/user-schema");

const changePasswordController = async (req, res) => {
    const { password, confirmPassword } = req.body;
    
    if (!password || !confirmPassword) return res.status(400).json({ message: "Password fields are required." });

    if (password !== confirmPassword) return res.status(400).json({ message: "Passwords do not match." });

    const sanitizedPassword = password.trim();
    const passwordRegex = /^[A-Za-z0-9!@#$%^&*()_+\-=]+$/;
    if (!passwordRegex.test(sanitizedPassword)) return res.status(400).json({ message: "Password contains invalid characters." });

    if (sanitizedPassword.length < 6) return res.status(400).json({ message: "Password must be at least 6 characters long." });

  try {
    const user = await UserDB.findOne();
    if (!user) return res.status(404).json({ message: "User not found." });

    const hashedPassword = await bcrypt.hash(sanitizedPassword, 10);
    user.password = hashedPassword;
    await user.save();

    res.status(200).json({ message: "Password changed successfully." });
  } catch (err) {
    console.error("Error changing password:", err);
    res.status(500).json({ message: "Internal server error." });
  }
};

module.exports = changePasswordController;
