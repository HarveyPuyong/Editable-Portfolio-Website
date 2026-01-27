const express = require('express');
const router = express.Router();
const { validate } = require('./../middlewares/request-validator');
const { loginRules, changePasswordRules, verifyOtpRules } = require('./../middlewares/request-validator-rules/auth-rules')
const  verifyResetPasswordToken = require("../middlewares/verify-reset-password-token");

// =======================
// LOGIN
// =======================
router.post('/login',
             validate(loginRules),
             require('../controllers/login-controller')); 

// =======================
// SEND OTP
// =======================            
router.post("/sendOTP", require('../controllers/otp-controller').sendOtp);

// =======================
// VERIFY OTP
// =======================
router.post("/verifyOTP",
             validate(verifyOtpRules),
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