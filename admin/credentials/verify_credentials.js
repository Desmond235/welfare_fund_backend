const db = require('../../dbConnection');
const bcrypt = require('bcrypt');

const verify = {
  verifyCredentials: async (req, res) =>{

    const username = req.body.username;
    const password = req.body.password;

    const data = {
    "username": req.body.username,
    "password": req.body.password,
    }

    var user;

    // db.query('SELECT * FROM signup WHERE email = ?',
    //     [req.body.email],
    //     (err, res) => {
    //         if(err){
    //             // return res.status(500).json({
    //             //     message: err.message || 'Internal Server Error'
    //             // })
    //         }
    //         // return res.status(200).json({
    //         //     message: "Email successfully registered",
    //         //     user
    //         // });
    //     }
    // )

    db.query(
        'SELECT * FROM admin_credentials WHERE username = ?',
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
                    { expiresIn: '30d' }
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
  }
}

module.exports = verify;