const db = require('../../dbConnection')
const bcrypt = require('bcrypt');

const update = {
    updateCredentials: async (req, res) => {
        const {username, password } = req.body;
        const {id} = req.params;
         bcrypt.hash(req.body.password, 10, (err, hash) => {
            if (err) {
                return res.status(500).json({
                    message: err.message || 'Error hashing password'
                });
            }
            db.query("UPDATE admin_credentials SET username = ?, password = ?",
                [username, hash], 
                (err, result) => {
               if (err) {
                   return res.status(400).json({
                       message: 'An error occurred while updating credentials'
                   });
               } else {
                   return res.status(200).json({
                       message: 'Credentials updated successfully'
                   });
               }
           })
         });
    }
}

module.exports = update;

