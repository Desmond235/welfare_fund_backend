const axios = require('axios');
require('dotenv').config();


const verifyPayment = {
    verifyPayment: async (req, res) => {
        try {
            const SECRET_KEY = process.env.PAYSTACK_SECRET_KEY;
            const {reference} = req.params;

            const response = await axios.get(
                `https://api.paystack.co/transaction/verify/${reference}`,
                {
                    headers: {
                        'Authorization': `Bearer ${SECRET_KEY}`
                    }
                },
            )
            const {status, data} = response.data;

            console.log(reference);

            if(status){
                if(data.status === 'success'){
                    return res.json({
                        success: true,
                        message: 'Payment verified successfully',
                        data
                    })
                } else {
                    return res.json({
                        success: false,
                        message: 'Payment verification failed',
                        data
                    })
                }
            } else{
                return res.json({
                    success: false,
                    message: "Failed to verify payment",
                    data
                });
            }
        } catch (error) {
            if (error.response && error.response.da) {
                return res.status(error.response.status).json({
                    status: false,
                    message: 'Paystack verification failed',
                    error: error.response.data.message || error.message
                })
            }else{
                return res.status(500).json({
                    status: false,
                    message: 'server Error',
                    error: error.message
                })
            }
        }
    }

}

module.exports = verifyPayment