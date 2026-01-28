const express = require('express');
const router = express.Router();
const {contactLimiter} = require('./../middlewares/limiter');
const { validate } = require('./../middlewares/request-validator');
const {contactRules} = require('./../middlewares/request-validator-rules/contact-rules')
const { sendContactForm } = require('../controllers/contact-form-emailer-controller');

router.post('/',
            contactLimiter, //contact limiter middleare
            validate(contactRules), // request validator middleare
            sendContactForm //send contact form controller
          );

module.exports = router;
