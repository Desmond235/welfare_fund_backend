const express = require('express');
const verifyPaymentRouter = express.Router();
const verifyPayment = require('../controllers/verify_payment');

verifyPaymentRouter.post('/verify-payment/:reference',verifyPayment.verifyPayment)

module.exports = verifyPaymentRouter;

