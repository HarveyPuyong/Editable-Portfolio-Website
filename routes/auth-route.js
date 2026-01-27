const express = require('express');
const router = express.Router();
const { validate } = require('./../middlewares/request-validator');
const { loginRules, changePasswordRules, verifyOtpRules } = require('./../middlewares/request-validator-rules/auth-rules')

router.post('/login', validate(loginRules), require('../controllers/login-controller')); // Login
router.post("/sendOTP", require('../controllers/otp-controller').sendOtp); // Send OTP
router.post("/verifyOTP", validate(verifyOtpRules), require('../controllers/otp-controller').verifyOtp); //Verify OTP
router.patch("/changePassword", validate(changePasswordRules), require('../controllers/change-password-controller')); //Change Password
router.get("/refreshToken", require('../controllers/refresh-token-controller')); //Refresh Token

module.exports = router;