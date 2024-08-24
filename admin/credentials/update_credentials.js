const db = require('../../dbConnection')
const bcrypt = require('bcrypt');

const update = {
    updateCredentials: async (req, res) => {
        const {username, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        db.query("UPDATE signup SET username = ?, password = ? WHERE id = ?",
             [username, hashedPassword, req.params.id], 
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
    }
}

module.exports = update;

