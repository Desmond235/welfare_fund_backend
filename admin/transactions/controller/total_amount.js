const db = require('../../../dbConnection')

const totalAmount = async (req, res) => {
    const query = `
        SELECT DATE_FORMAT(date, '%Y-%m') AS month, SUM(amount) AS total_amount
         FROM transaction 
         GROUP BY month
         ORDER BY month;
        `;
    db.query(query, (err, results) => {
        if (err) {
            return res.status(400).json({
                message: 'An error occurred while fetching total amount from the database'
            });
        }
        return res.json(results);
    })
}

module.exports = totalAmount;