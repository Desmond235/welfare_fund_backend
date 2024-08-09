const express = require('express');
const verifyPaymentRouter = express.Router();
const verifyPayment = require('../controllers/verify_payment');

verifyPaymentRouter.get('/verify-payment', verifyPayment.verifyPayment)

module.exports = verifyPaymentRouter;

