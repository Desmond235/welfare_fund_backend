const express = require('express');
const payment = express.Router();
const initializePayment= require('../controllers/controller');

payment.post('/payment', initializePayment.acceptPayment);


module.exports = payment;

