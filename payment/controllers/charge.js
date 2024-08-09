 const https = require('https');
 require('dotenv').config();

 const Charge = {
    charge: (req, res) => {
        try {
            const params = JSON.stringify({
                "email": req.body.email,
                "amount": req.body.amount,
                "authorization_code": req.body.authorization_code
            });

            const options = {
                hostname: 'api.paystack.co',
                path: '/charge/charge_authorization',
                method: 'POST',
                headers: { 
                    Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
                    'Content-Type': 'application/json'
                }
            }

            const sReq = https.request(options, res => {
                var data = '';

                res.on('data', (chunk) => {
                    data += chunk;
                })

                res.on('end', () => {
                    const response = JSON.parse(data);
                    console.log(response);
                })
            }).on('error' , error => {
                console.log(error);
            })
            sReq.write(params);
            sReq.end();
        } catch (error) {
            console.log(error);
        }
    }
 }