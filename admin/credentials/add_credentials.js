 const db = require('../../dbConnection');

 const AddCredentials = {
     addCredentials: async (req, res) => {
         const { username, password } = req.body;
         const hashedPassword = await bcrypt.hash(password, 10);
         const query = 'INSERT INTO credentials (username, password) VALUES (?,?)';

         try {
            db.query(query, [username, hashedPassword], (err, result) => {
                if (err) {
                   return res.status(404).json({
                       error: true,
                       message: "An error occurred"
                   })
                }
                return res.status(200).json({
                    success: true,
                    message: "Credentials added successfully",
                    data: result
                })
            });
         } catch (error) {
            return res.status(500).json({
                error: error.message || "Server Error"
            })
         }
     }
 }