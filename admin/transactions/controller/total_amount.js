const db = require('../../../dbConnection')

const totalAmount = async (req, res) => {
    const query = `
        SELECT SUM(amount) AS total_amount
         FROM transaction;
        `;
    db.query(query, (err, result) => {
        if (err) {
            return res.status(400).json({
                message: 'An error occurred while fetching total amount from the database'
            });
        }
        return res.json(result[0]);
    })
}

module.exports = totalAmount;