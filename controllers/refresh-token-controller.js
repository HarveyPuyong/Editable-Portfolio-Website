const UserDB = require("./../models/user-schema");
const jwt = require("jsonwebtoken");
const { generateAccessToken } = require("./../utils/generate-token");

const refreshTokenController = async (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwt)
    return res.status(400).json({ message: "Refresh token not found." });

  const refreshToken = cookies.jwt;

  try {
    // Since single-user system, just fetch the only user
    const user = await UserDB.findOne();
    if (!user) return res.status(404).json({ message: "User not found." });

    // Check if stored refresh token matches cookie
    if (!user.refreshToken.includes(refreshToken)) return res.status(403).json({ message: "Invalid refresh token." });

    // Verify token validity
    jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET,
      (err, decoded) => {
        if (err) return res.status(403).json({ message: "Token verification failed." });

        // Generate new access token
        const accessToken = generateAccessToken(
          process.env.ACCESS_TOKEN_SECRET,
          process.env.ACCESS_TOKEN_EXPIRY,
          user._id,
        );

        return res.status(200).json({ message: "Access token refreshed successfully.", accessToken });
      }
    );
  } catch (err) {
    console.error("Error refreshing token:", err);
    res.status(500).json({ message: "Internal server error." });
  }
};

module.exports = refreshTokenController;
