const { body } = require('express-validator');

// =======================
// LOGIN RULES
// =======================
const loginRules = [
  body('email')
    .notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Invalid email format')
    .normalizeEmail(),
  body('password')
    .notEmpty().withMessage('Password is required')
];

// =======================
// CHANGE PASSWORD RULES
// =======================
const changePasswordRules = [
  body('password')
    .notEmpty().withMessage('Password is required')
    .trim()
    .isLength({ min: 6 }).withMessage('Password must be at least 6 characters')
    .matches(/^[A-Za-z0-9!@#$%^&*()_+\-=]+$/).withMessage('Password contains invalid characters'),
  body('confirmPassword')
    .notEmpty().withMessage('Confirm password is required')
    .custom((value, { req }) => value === req.body.password)
    .withMessage('Passwords do not match')
];

// =======================
// VERIFY OTP RULES
// =======================
const verifyOtpRules = [
  body('otp')
    .notEmpty().withMessage('OTP is required')
    .isLength({ min: 6, max: 6 }).withMessage('OTP must be 6 digits')
];

// =======================
// CHANGE EMAIL
// =======================
const changeEmailRules = [
  body("email")
    .notEmpty().withMessage('Email is required')
    .trim()
    .isEmail()
    .normalizeEmail(),
];


module.exports = { loginRules, changePasswordRules, verifyOtpRules, changeEmailRules };
