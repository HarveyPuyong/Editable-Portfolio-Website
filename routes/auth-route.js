const express = require('express');
const router = express.Router();
const { validate } = require('./../middlewares/request-validator');
const { loginRules, changePasswordRules, verifyOtpRules } = require('./../middlewares/request-validator-rules/auth-rules')
const  verifyResetPasswordToken = require("../middlewares/verify-reset-password-token");
const {  loginLimiter, sendOtpLimiter, verifyOtpLimiter} = require('./../middlewares/limiter');

// =======================
// LOGIN
// =======================
router.post('/login',
             validate(loginRules),
             loginLimiter,
             require('../controllers/login-controller')); 

// =======================
// SEND OTP
// =======================            
router.post("/sendOTP",
             sendOtpLimiter,
             require('../controllers/otp-controller').sendOtp);

// =======================
// VERIFY OTP
// =======================
router.post("/verifyOTP",
             validate(verifyOtpRules),
             verifyOtpLimiter,
             require('../controllers/otp-controller').verifyOtp); 

// =======================
// CHANGE PASSWORD
// =======================
router.patch("/changePassword",
              validate(changePasswordRules),
              verifyResetPasswordToken,
              require('../controllers/change-password-controller')); 

// =======================
// REFRESH TOKEN
// =======================              
router.get("/refreshToken", require('../controllers/refresh-token-controller')); //Refresh Token

module.exports = router;