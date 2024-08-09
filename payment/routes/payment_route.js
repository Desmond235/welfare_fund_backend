const express = require('express');
const paymentRouter = express.Router();
const makePayment = require('../controllers/payment_controller')


paymentRouter.post('/receive-payment',makePayment.receivePayment );

module.exports = paymentRouter;