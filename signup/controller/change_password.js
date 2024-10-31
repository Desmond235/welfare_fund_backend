
const db = require('../../dbConnection')
const bcrypt = require('bcrypt');

const change = {
    changePassword: async (req, res) => {
        console.log(req.body.password);
         bcrypt.hash(req.body.password, 10, (err, hash) => {
            if (err) {
                return res.status(500).json({
                    message: err.message || 'Error hashing password'
                });
            }
            db.query("UPDATE signup SET password = ?",
                [hash], 
                (err, result) => {
               if (err) {
                   return res.status(400).json({
                       message: 'An error occurred while updating credentials',
                       result
                   });
               } else {
                if(result.affectedRows >0){
                    return res.status(200).json({
                        message: 'Credentials updated successfully',
                        affectedRows: result.affectedRows
                    });
                }
                else{
                    return res.status(404).json({
                        message: 'User not found',
                        affectedRows: result.affectedRows
                    });
                }
               }
           })
         });
    }
}

module.exports = change;

