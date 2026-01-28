const rateLimit = require('express-rate-limit');

// =======================
// Login Limiter
// =======================
const loginLimiter = rateLimit({
  windowMs: 7 * 60 * 1000, // 7 minutes
  max: 7, // 5 attempts per IP
  standardHeaders: true,
  legacyHeaders: false,
  message: { message: 'Too many login attempts. Please try again after 7 minutes.' }
});

// =======================
// Send OTP Limiter
// =======================
const sendOtpLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 3, // 3 OTP requests per minute
  standardHeaders: true,
  legacyHeaders: false,
  message: { message: 'Too many OTP requests. Please wait a minute and try again.' }
});

// =======================
// Verify OTP Limiter
// =======================
const verifyOtpLimiter = rateLimit({
  windowMs: 5 * 60 * 1000, // 5 minutes
  max: 5, // 5 attempts per 5 minutes
  standardHeaders: true,
  legacyHeaders: false,
  message: { message: 'Too many OTP verification attempts. Please try again after 5 minutes.' }
});

// =======================
// Contact Limiter
// =======================
const contactLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 2,
  standardHeaders: true,
  legacyHeaders: false,
  message: { message: 'Too many contact requests. Please try again after 1 minutes.' }
});

// =======================
// Export all limiters
// =======================
module.exports = {
  loginLimiter,
  sendOtpLimiter,
  verifyOtpLimiter,
  contactLimiter
};
