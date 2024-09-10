const axios = require('axios');
require('dotenv').config();
const db = require('../../dbConnection')
const {format} = require('date-fns');


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

                    const date = format(Date.now(), 'yyyy-MM-dd');
                    const query = 'INSERT INTO transaction (firstname,lastname,amount, email, date) VALUES(?, ?, ?, ?, ?)';
                    const values = [data.customer.first_name, data.customer.last_name, data.amount / 100, data.customer.email, date ];
                    
                    db.query(query, values, (err, result) => {
                        if(err){
                            return res.status(400).json({
                                message: 'An error occurred while inserting data into the database'
                            });
                        }  
                    })
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
            if (error.response) {
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