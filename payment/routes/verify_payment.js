const express = require('express');
const verifyPaymentRouter = express.Router();
const verifyPayment = require('../controllers/verify_payment');

verifyPaymentRouter.post('/verify-payment/:reference/:id',verifyPayment.verifyPayment)

module.exports = verifyPaymentRouter;

