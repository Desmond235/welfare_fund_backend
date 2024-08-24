const db = require('../../dbConnection');
const bcrypt = require('bcrypt');

const verify = {
  verifyCredentials: async (req, res) =>{

    console.log(req.body);

    const username = req.body.username;
    const password = req.body.password;

    const query = 'SELECT * FROM admin_credentials WHERE username = ?';
    db.query(
      query,
      [username],
      (err, results) => {
        if (err) {
          return res.status(500).json({
            message: err.message || 'Internal server error'
          });
        }

        const user = results[0];
        if(results.length === 0){
          return res.status(404).json({
            message: "Username or password incorrect"
          })
        }

        bcrypt.compare(password, user.password, (bErr, bResult) => {
          if(bErr || !bResult){
            return res.status(401).json({
              error: true,
              message: "Username or password incorrect"
            })
          }

          return res.status(200).json({
            error: false,
            message: "User authenticated successfully"
          })
        })
      }
    )
  }
}

module.exports = verify;