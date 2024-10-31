const { retrieveSourceMap } = require('source-map-support');
const db = require('../../dbConnection');

const checkEmail = {
    checkEmail: async (req, res) => {
        const { email } = req.body;
        const query = 'SELECT * FROM admin_credentials WHERE email = ?';

        db.query(
            query,
             [email], 
            (err, result) => {
                if (err) {
                    return res.status(500).json({
                        message: 'An error occurred while checking email'
                    });
                }
                if (!result.length) {
                    return res.status(200).json({
                        message: 'Email does not exist'
                    })
                }
                return res.json({
                    message: 'Email exists',
                });
            
        })
    }
}

module.exports = checkEmail