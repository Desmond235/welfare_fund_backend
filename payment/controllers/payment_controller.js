require('dotenv').config();
const axios = require('axios');

const makePayment = {
    receivePayment: async (req, res) => {
        const { email, amount, callback_url, reference } = req.body;

        const fData = {
            'amount': amount,
            'email': email,
        }

        console.log(fData);

        try {
            const response = await axios.post(
                'https://api.paystack.co/transaction/initialize',
                {
                    amount: amount * 100,
                    email : email,
                    channels: ["card", "mobile_money"], // Amount in kobo
                    
                },
                {
                    headers: {
                        Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
                        'Content-Type': 'application/json',
                    },
                }
            );

            const { status, data } = response.data;
             console.log(data);
             
            if (status) {
                return res.json({
                    success: true,
                    authorization_url: data.authorization_url,
                    reference : data.reference,
                    metadata: req.body.metadata,
                    data
                });
            } else {
                return res.status(400).json({
                    success: false,
                    message: 'Transaction initialization failed'
                });
            }
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: 'Server error',
                error: error.message
            });
        }
    }
}

module.exports = makePayment;

