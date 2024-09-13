const express = require('express');
const crypto = require('node:crypto');
const paymentRouter = express.Router();
const makePayment = require('../controllers/payment_controller');
const getTransactions = require('../controllers/get_transactions');
require('dotenv').config();

const secret = process.env.PAYSTACK_SECRET_KEY;


paymentRouter.post('/receive-payment',makePayment.receivePayment );
paymentRouter.get('/get-transactions/:id', getTransactions.getTransactions);
paymentRouter.post('/', async (req, res) => {
    const hash = crypto.createHmac('sha512', secret ).update(JSON.stringify(req.body)).digest('hex');
    console.log(hash);
    console.log(req.headers['Host']);
    console.log(secret);
     if(hash === req.headers['x-paystack-signature']){
        const event = req.body;
        console.log(event);
        console.log(req.headers)
     }
    res.sendStatus(200);
})

module.exports = paymentRouter;