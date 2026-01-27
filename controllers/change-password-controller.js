const bcrypt = require("bcrypt");
const UserDB = require("../models/user-schema");

const changePasswordController = async (req, res) => {
  try {
    const { password } = req.body;

    const user = await UserDB.findOne();
    if (!user) return res.status(404).json({ message: "User not found" });

    const hashedPassword = await bcrypt.hash(password.trim(), 10);
    user.password = hashedPassword;

    await user.save();

    res.status(200).json({ message: "Password changed successfully" });
  } catch (err) {
    console.error("Change password error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = changePasswordController;
