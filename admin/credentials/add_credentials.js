 const db = require('../../dbConnection');
 const bcrypt = require('bcrypt');

 const AddCredentials = {
     addCredentials: async (req, res) => {
         const { username, password } = req.body;
         const hashedPassword =  bcrypt.hash(password, 10, (err, hash) =>{
             if (err) {
                 return res.status(500).json({
                     error: true,
                     message: err.message || "An error occurred while hashing password"
                 })
             }
            
         } );
         const query = 'INSERT INTO admin_credentials (username, password) VALUES (?,?)';

         try {
            db.query(query, [username, hashedPassword], (err, result) => {
                if (err) {
                   return res.status(404).json({
                       error: true,
                       message:err.message || "An error occurred"
                   })
                }
                return res.status(200).json({
                    success: true,
                    message: "Credentials added successfully",
                    data: result[0]
                })
            });
         } catch (error) {
            return res.status(500).json({
                error: error.message || "Server Error"
            })
         }
     }
 }

 module.exports = AddCredentials;