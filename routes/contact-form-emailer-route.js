const express = require('express');
const router = express.Router();
const contactLimiter = require('./../middlewares/contact-limiter')
const { sendContactForm } = require('../controllers/contact-form-emailer-controller');

router.post('/', contactLimiter, sendContactForm);

module.exports = router;
