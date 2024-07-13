const express = require('express');
const router = express.Router();
const { signupValidation, loginValidation } = require('./validation/validation');
const bcrypt = require('bcryptjs');
const db = require('../dbConnection');
const jwt = require('jsonwebtoken');
const e = require('express');


router.post('/signup', signupValidation, (req, res) => {
    const { username, email, password } = req.body;
    db.query(`SELECT * FROM users WHERE username =${db.escape(username)
        };`,
        (err, result) => {
            if (err) throw `something went wrong ${err}`
            if (result.length) {
                return result.status(409).json(
                    {
                        message: 'This username is already taken'

                    }
                );
            } else {
                bcrypt.hash(password, (err, hash) => {
                    if (err) {
                        res.status(500).json({ message: err });
                    } else {
                        db.query(`INSERT INTO users VALUES(
                            ${db.escape(username)},
                            ${db.escape(email)},
                            ${db.escape(hash)}
                            )`,
                            (err, result) => {
                                if (err) {
                                    return res.status(400).json({
                                        err: err.message || 'Something went wrong'
                                    });
                                }
                                else {
                                    return res.status(201).json({
                                        message: 'You have registered successfully'
                                    });
                                }
                            }
                        );
                    }
                });
            }
        })
});

router.post('/login', loginValidation, (req, res) => {
    const { username, email, password } = req.body;
    db.query(
        `SELECT * FROM users WHERE username = ${db.escape(
            username)};`,
        (err, result) => {
            if (err) throw `something went wrong\n${err}`;
            if (!result.length) {
                res.status(401).json({
                    message: "Username or password incorrect"
                })
            }
            bcrypt.compare(password, result[0].password,
                (bErr, bResult) => {
                    if (bErr) {
                        res.status(401).json({
                            message: "Email or password incorrect"
                        });
                    }
                    if (bResult) {
                        const token = jwt.sign(
                            { id: result[0].id },
                            process.env.SECRET_KEY,
                            { expiresIn: '1h' }
                        );
                        db.query(
                            `UPDATE users SET last_login = now() WHERE id =${db.escape
                                (result[0].id

                                )};`
                        )
                        return res.status(200).json({
                            message: "Login Successful",
                            token,
                            user: result[0]
                        });
                    }
                    res.status(400).json({
                        message: "Username or password incorrect"
                    });
                }
            )
        }
    );
});

router.post('/get-users', signupValidation, (req, res, next) => {
    if (!req.headers.authorization ||
         !req.headers.startsWith("Bearer") || 
         req.headers.authorization.split('')[1]) {
        return res.status(401).json({
            message: "Unauthorized request"
        });
    }
    
    const decodedToken =  req.headers.authorization.split('')[1];
    const token = jwt.verify(decodedToken, process.env.secretKey);
    db.query(
        `SELECT * FROM users WHERE id = ${token.id}`,
        (err, result) => {
            if (err) {
                res.status(401).json({
                    message: "Unauthorized request"
                });
            }
            res.status(200).json({
                users: result[0],
                message: 'Fetching users successful'
            });
        }
    );
})

module.exports = router;
