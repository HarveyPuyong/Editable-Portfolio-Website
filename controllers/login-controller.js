const bcrypt = require('bcrypt');
const { generateAccessToken, generateRefreshToken } = require('./../utils/generate-token');
const UserDB = require('../models/user-schema');

const loginController = async (req, res) => {
  try {
    const { email, password } = req.body; // validated by middleware

    const foundUser = await UserDB.findOne({ email }).exec();
    if (!foundUser) return res.status(404).json({ message: "User not found" });

    const matchPassword = await bcrypt.compare(password, foundUser.password);
    if (!matchPassword) return res.status(400).json({ message: "Incorrect password" });

    // generate tokens
    const accessToken = generateAccessToken(process.env.ACCESS_TOKEN_SECRET, process.env.ACCESS_TOKEN_EXPIRY, foundUser._id);
    const refreshToken = generateRefreshToken(process.env.REFRESH_TOKEN_SECRET, process.env.REFRESH_TOKEN_EXPIRY, foundUser._id);

    // keep last 2 refresh tokens
    foundUser.refreshToken.push(refreshToken);
    if (foundUser.refreshToken.length > 2) {
      foundUser.refreshToken = foundUser.refreshToken.slice(-2);
    }
    await foundUser.save();

    // set refresh token cookie
    res.cookie('jwt', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'Lax',
      maxAge: 7 * 24 * 60 * 60 * 1000
    });

    return res.status(200).json({ message: "User logged in successfully", accessToken });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "An unexpected error occurred. Please try again later" });
  }
};

module.exports = loginController;
