require('dotenv').config();
const axios = require('axios');
const { format } = require('date-fns');
const db = require('../../dbConnection');

const makePayment = {
  receivePayment: async (req, res) => {
    const { email, amount } = req.body;

    const fData = {
      amount,
      email,
    };

    console.log(fData);

    try {
      // Initialize the transaction
      const response = await axios.post(
        'https://api.paystack.co/transaction/initialize',
        {
          amount: amount * 100, // Amount in kobo
          email,
          channels: ['card', 'mobile_money'],
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
        // Return the authorization URL to the client to redirect for payment
        return res.json({
          success: true,
          authorization_url: data.authorization_url,
          reference: data.reference,
        });
      } else {
        return res.status(400).json({
          success: false,
          message: 'Transaction initialization failed',
        });
      }
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: 'Server error',
        error: error.message,
      });
    }
  },

  verifyPayment: async (req, res) => {
    const { reference } = req.params;

    try {
      const response = await axios.get(
        `https://api.paystack.co/transaction/verify/${reference}`,
        {
          headers: {
            Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
          },
        }
      );

      const { status, data } = response.data;

      if (status) {
        if (data.status === 'success') {
          const date = format(new Date(), 'yyyy-MM-dd');
          const query =
            'INSERT INTO transaction (amount, email, date) VALUES (?, ?, ?)';
          const values = [data.amount / 100, data.customer.email, date];

          db.query(query, values, (err, result) => {
            if (err) {
              return res.status(400).json({
                success: false,
                message: err.message || 'Something went wrong',
              });
            }

            return res.json({
              success: true,
              message: 'Payment verified and transaction recorded',
              data: result,
            });
          });
        } else {
          return res.status(400).json({
            success: false,
            message: 'Payment verification failed',
          });
        }
      } else {
        return res.status(400).json({
          success: false,
          message: 'Verification status is false',
        });
      }
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: 'Server error during payment verification',
        error: error.message,
      });
    }
  },
};

module.exports = makePayment;
