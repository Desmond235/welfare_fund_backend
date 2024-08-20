const express = require('express');
const emailRouter = express.Router();
const sendMail = require('../controllers/email_controller');
const verifyEmail = require('../controllers/verify_email')


emailRouter.post('/send-email', sendMail.sendEmail);
emailRouter.post('/verify-email', verifyEmail.verifyOtp);

module.exports = emailRouter;