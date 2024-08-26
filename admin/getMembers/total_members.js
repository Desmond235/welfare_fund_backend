const db = require('../../dbConnection');

const totalMembers = async(req, res) => {
    const query = 'SELECT COUNT(*) as totalMembers FROM membership';
    db.query(query, (err, result) => {
        if (err) {
            return res.status(400).json({
                message: 'An error occurred while fetching total members from the database'
            });
        }
        return res.json(result[0]);
    })
}

module.exports = totalMembers;