const db = require('../../dbConnection');

const verifyOtp = {
    verifyOtp: async (req, res) => {
        const id = req.params.id;

        db.query("SELECT * FROM otp WHERE id =?", [id], (err, result) => {
            if (err) {
                return res.status(400).json({
                    message: 'An error occurred while retrieving OTP from the database'
                });
            } else if (result.length === 0) {
                return res.status(404).json({
                    message: 'OTP not found or expired'
                });
            } else if (Date.now() > result.expiry_date) {
                return res.status(400).json({
                    message: 'OTP expired'
                });
            }
            else {
                if (ot === result.otp) {
                    return res.status(200).json({
                        message: 'OTP verified successfully',
                        otp: result.otp,
                    });
                } else{
                    return res.status(400).json({
                        message: 'Invalid OTP'
                    });
                }
            }
        })
    }
}

module.exports = verifyOtp;