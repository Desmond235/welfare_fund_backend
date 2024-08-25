const db = require('../../../dbConnection');

const search = {
    searchTransaction: async (req, res) => {
        const searchQuery = req.query.search || '';
       const query = `SELECT * FROM transaction WHERE email LIKE ? 
       OR amount LIKE ? OR date LIKE ? ORDER BY date DESC `;
       const searchValue = [`%${searchQuery}%`];

       db.query(
            query,
            [ searchValue, searchValue, searchValue],
            (err, result) => {
                if(err){
                    return res.status(400).json({
                        message: "An error occurred"
                    });
                } else{
                    res.json(result);
                }
            }
        );
    }
}

module.exports = search;