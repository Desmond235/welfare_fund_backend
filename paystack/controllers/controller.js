require('dotenv').config();
const express = require('express');
const https = require('https');

const payStack = {
    acceptPayment: async (req, res) => {
        try {
            const email = req
            const amount = req.body.amount
            const params = JSON.stringify({
                'email': email,
                'amount': amount * 100
            });
            const options = {
                hostname: 'api.paystack.co',
                path: '/transaction/initialize',
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
                    'Content-Type': 'application/json'
                },
            }
            const clientReq = https.request(options, apiRes =>{
                let data1 = '';
                apiRes.on('data', (chunk)=>{
                    data1 += chunk;
                });

                const {status, data} = clientReq.data1;
                apiRes.on('end', () => {
                    console.log(JSON.parse(data));
                    if(status){
                        return res.status(200).json({
                            status: true,
                            authorization_url: data.authorization_urls
                        });
                    }
                });
            }).on('error', (error) => {
                console.log(error);
                clientReq.write(params);
                clientReq.end();
            })
        } catch (error) {
            console.error(error);
            res.status(500).json({
                message: 'Internal Server Error'
            });
        }
    }
}
const initializePayment = payStack;
module.exports = initializePayment;