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
            text: `Please verify your account. Your verification is ${otp}`,
            html: `<br><p style="color:grey; font-size:1.3em;" > Please verify your account. Below is your verification code</p> <p><h1 style = "color:black;">${otp}</h1></p>`
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



module.exports = sendMail;
