const db = require('../../dbConnection');

const verifyOtp = {
    verifyOtp: async (req, res) => {
        const id = req.params.id;
        const date =  Date.now();

        const otp = req.body.otp;

        db.query("SELECT * FROM otp WHERE otp = ? AND expiry_date >? ", [otp, date], (err, result) => {
            if (err) {
                return res.status(400).json({
                    message: 'An error occurred while retrieving OTP from the database'
                });
            } else if (result.length === 0) {
                return res.status(404).json({
                    message: 'OTP not found or expired'
                });
            } 
            else {
                const otpRecord = result[0];
                    return res.status(200).json({
                        message: 'OTP verified successfully',
                        otp: otpRecord
                    });
                
            }
        })
    }
}

module.exports = verifyOtp;