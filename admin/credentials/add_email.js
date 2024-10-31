const express = require('express');
const db = require('../../dbConnection');

const addEmail = {
    insertEmail: async (req, res) => {
        const {email} = req.body;

        const query = 'UPDATE admin_credentials SET email = ?';
        db.query(query, [email], (err, result) => {
            if (err) {
                console.error(err);
                return res.status(500).json({
                    message: err.message || 'Error inserting email'
                });
            }

            res.status(201).json({
                message: 'Email added successfully',
            })
        },
        )
    }
}

module.exports = addEmail;