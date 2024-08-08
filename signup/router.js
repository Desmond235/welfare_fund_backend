const express = require('express');
const router = express.Router();
const { signupValidation, loginValidation } = require('./validation/validation');
const bcrypt = require('bcrypt');
const db = require('../dbConnection');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const e = require('express');

const data = [];
const sData = [];

router.post('/signup', signupValidation, (req, res, next) => {
    const pData = {
        "username": req.body.username,
        "email": req.body.email,
        "contact": req.body.contact,
        "password": req.body.password
    }
    data.push(pData);
    console.log("final product", pData);
    db.query(
        'SELECT * FROM signup WHERE email = ?',
        [req.body.email],
        (err, result) => {
            if (err) {
                return res.status(500).json({
                    message: err.message || 'Internal server error'
                });
            }
            const user = result[0];

            if (result.length) {
                return res.status(409).json({
                    message: 'Email already in use',
                    user
                });
            } else {
                bcrypt.hash(req.body.password, 10, (err, hash) => {
                    if (err) {
                        return res.status(500).json({
                            message: err.message || 'Error hashing password'
                        });
                    }
 
                    db.query(
                        'INSERT INTO signup (username, email, contact, password) VALUES (?, ?, ?, ?)',
                        [req.body.username, req.body.email,req.body.contact, hash,],
                        (err, result) => {
                            const user = result[0];
                            if (err) {
                                return res.status(400).json({
                                    message: err.message || 'Something went wrong',
                                });
                            }

                            return res.status(201).json({
                                message: 'You have registered successfully',
                                user
                            });

                        },
                        console.log(user)
                    );
                });
            }
        }
    );

});

router.post('/login', loginValidation, (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    const data = {
    "username": req.body.username,
    "password": req.body.password,
    }

    sData.push(data);
    console.log( sData);

    console.log(username);

    var user;

    db.query('SELECT * FROM signup WHERE email = ?',
        [req.body.email],
        (err, res) => {
            if(err){
                // return res.status(500).json({
                //     message: err.message || 'Internal Server Error'
                // })
            }
            // return res.status(200).json({
            //     message: "Email successfully registered",
            //     user
            // });
        }
    )

    db.query(
        'SELECT * FROM signup WHERE username = ?',
        [req.body.username],
        (err, results) => {
            if (err) {
                return res.status(500).json({
                    message: err.message || 'Internal server error'
                });
            }
            if (results.length === 0) {
                return res.status(401).json({
                    message: "Username or password incorrect"
                });
            }

             user = results[0];

            bcrypt.compare(req.body.password, user.password, (bErr, bResult) => {
                if (bErr || !bResult) {
                    console.log(username)
                    return res.status(401).json({
                        message: "Username or password incorrect"
                    });
                    
                }

                const token = jwt.sign(
                    { id: user.id },
                    process.env.SECRET_KEY,
                    { expiresIn: '10d' }
                );

                // Uncomment and use if you want to update the last login time
                // db.query(
                //     'UPDATE signup SET last_login = NOW() WHERE id = ?',
                //     [user.id],
                //     (updateErr) => {
                //         if (updateErr) {
                //             console.error("Failed to update last login time:", updateErr);
                //         }
                //     }
                // );

                return res.status(200).json({
                    message: "Login Successful",
                    token,
                    user
                });
            });
        }
    );

   
});

router.post('/get-users', signupValidation, (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({
            message: "Unauthorized request"
        });
    }

    const token = authHeader.split(' ')[1];

    let decodedToken;
    try {
        decodedToken = jwt.verify(token, process.env.SECRET_KEY);
    } catch (err) {
        return res.status(401).json({
            message: "Invalid or expired token"
        });
    }

    const userId = decodedToken.id;

    db.query(
        'SELECT * FROM signup WHERE id = ?',
        [userId],
        (err, results) => {
            if (err) return next(err);

            if (results.length === 0) {
                return res.status(404).json({
                    error: true,
                    message: "User not found"
                });
            }

            return res.json({
                error: false,
                data: results[0],
                message: "User fetched successfully"
            });
        }
    );
});
module.exports = router;
