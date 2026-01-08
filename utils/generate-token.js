const jwt = require('jsonwebtoken');

// generate accessToken
function generateAccessToken(accessToken, tokenExpiry, userId) {
  return jwt.sign(
          {"id": userId},
          accessToken,
          {expiresIn: tokenExpiry}
        );
} 

// generate refreshToken
function generateRefreshToken(refreshToken, tokenExpiry, userId) {
  return jwt.sign(
    {"id": userId},
    refreshToken, 
    {expiresIn: tokenExpiry}
  );
}


module.exports = {generateAccessToken, generateRefreshToken}