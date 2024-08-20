const nodemailer = require('nodemailer');
const db = require('../../dbConnection');
require('dotenv').config();

const sendMail = {
    sendEmail: async(req, res) => {
        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                type: 'OAuth2',
                clientId: process.env.CLIENT_ID,
                clientSecret: process.env.CLIENT_SECRET,
                refreshToken: process.env.REFRESH_TOKEN,
                user: process.env.EMAIL,
                pass: process.env.EMAIL_PASSWORD
            }
        });

        function generateOTP(){
            return Math.floor(100000 + Math.random() * 900000);
        }

        let otp = generateOTP();
        const expiryDate = Date.now() + 180000;

        let mailOptions = {
            from: process.env.EMAIL,
            to: req.body.email,
            subject: "Verify your account" ,
            text: `Your verification is ${otp}`,
            html: `<br> Your verification is <b>${otp}</b>`
        };

        db.query("INSERT INTO otp VALUES (?, ?)", [otp, expiryDate], (err, result) => {
            if(err){
                return res.status(400).json({
                    message: 'An error occurred while inserting OTP into the database'
                });
            }else{
                return res.status(200).json({
                    message: "OTP sent successfully",
                    otp: otp
                })
            }
        })
        try {
            const info = await transporter.sendMail(mailOptions);

            console.log("Message sent: %s", info.messageId);
            console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
        } catch (error) {
            console.log("Error: %s", error);
        }
    }
}


const verifyOtp = {
    verifyOtp: async (req, res) => { 
        const id = req.params.id;

        db.query("SELECT * FROM otp WHERE id =?", [id], (err, result) => {
            if(err){
                return res.status(400).json({
                    message: 'An error occurred while retrieving OTP from the database'
                });
            }else if(result.length === 0){
                return res.status(404).json({
                    message: 'OTP not found or expired'
                });
            } else if(result.expiry_date > Date.now()){
                return res.status(400).json({
                    message: 'OTP expired'
                });
            }
            else{
                return res.status(200).json({
                    message: 'OTP verified successfully'
                });
            }
        })
    }
}

module.exports = sendMail;
module.exports = verifyOtp;