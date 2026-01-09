const express = require('express');
const router = express.Router();

router.post('/login', require('../controllers/login-controller')); // Login
router.post("/sendOTP", require('../controllers/otp-controller').sendOtp); // Send OTP
router.post("/verifyOTP", require('../controllers/otp-controller').verifyOtp); //Verify OTP
router.patch("/changePassword", require('../controllers/change-password-controller')); //Change Password
router.get("/refreshToken", require('../controllers/refresh-token-controller')); //Refresh Token

module.exports = router;