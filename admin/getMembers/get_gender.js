const db = require('../../dbConnection');

const countGender = async(req, res) => {
    const query = 'SELECT gender, COUNT(*) as count_gender FROM membership GROUP BY gender';
    db.query(query, (err, result) => {
        if (err) {
            return res.status(400).json({
                message: 'An error occurred while fetching gender from the database'
            });
        }
        return res.json(result);
    })
}

module.exports = countGender;