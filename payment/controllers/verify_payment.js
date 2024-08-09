const axios = require('axios');
require('dotenv').config();


const verifyPayment = {
    verifyPayment: async (req, res) => {
        try {
            const SECRET_KEY = process.env.PAYSTACK_SECRET_KEY;
            const {reference} = req.body;

            const response = await axios.get(
                `https/paystack.co/transaction/verify/${reference}`,
                {
                    headers: {
                        'Authorization': `Bearer ${SECRET_KEY}`
                    }
                },
            )
            const {status, data} = response.data;

            if(status){
                if(data.status === 'success'){
                    return res.json({
                        success: true,
                        message: 'Payment verified successfully',
                        data
                    })
                }

                else {}
            }
        } catch (error) {
            
        }
    }

}

module.exports = verifyPayment