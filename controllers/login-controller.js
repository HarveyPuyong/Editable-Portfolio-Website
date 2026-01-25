const bcrypt = require('bcrypt');
const {generateAccessToken, generateRefreshToken} = require('./../utils/generate-token');
const UserDB = require('../models/user-schema');


const loginController = async(req, res) => {
  const {email, password} = req.body;

  if(!email || !password) return res.status(400).json({message: "Email and password are required"});

  try{
    const foundUser = await UserDB.findOne({email}).exec();
    if(!foundUser) return res.status(404).json({message: "User not Found"});

    const matchPassword = await bcrypt.compare(password, foundUser.password);
    if(!matchPassword) return res.status(400).json({message: "Incorrect Password"});

    // accessToken
    const accessToken = generateAccessToken(process.env.ACCESS_TOKEN_SECRET,
                                            process.env.ACCESS_TOKEN_EXPIRY,
                                            foundUser._id,
    );

    // refreshToken
    const refreshToken = generateRefreshToken(process.env.REFRESH_TOKEN_SECRET,
                                              process.env.REFRESH_TOKEN_EXPIRY,
                                              foundUser._id,
    );

    foundUser.refreshToken.push(refreshToken);

    if (foundUser.refreshToken.length > 2) {
        foundUser.refreshToken = foundUser.refreshToken.slice(-2); 
    }

    await foundUser.save();

    //Store the refreshToken in cookie
    res.cookie('jwt', refreshToken,
      {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production', //abaguhin yung NODE_ENV = production sa .env kapag naka host na
        sameSite: 'Lax', //change sa 'None' kapag naka host na
        maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
        }
     );
    
    return res.status(200).json({ 
      message: `User is successfully login`, 
      accessToken, 
    });
  }catch(err){
    console.log(err.message);
    return res.status(500).json({message: "An unexpected error occurred. Please try again later"})
  }
}


module.exports = loginController;