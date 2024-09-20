const db = require('../../dbConnection');

const transactions = {
    getTransactions: async (req, res) => {
       try {
        const {userId } = req.params
         const query = 'SELECT * FROM transaction WHERE userId = ?'
         
         db.query(
            query,
            [userId],
            (err, result) => {
                if(err){
                    return res.status(400).json({
                        message: "An error occurred"
                    });
                }else{
                   return res.status(200).json({
                        message: "Transactions fetched successfully",
                        data: result
                    })
                }
            }
         )
        
       } catch (error) {
          return res.status(500).json({
            message: error.message || "Server Error"
         })
       }
    }
}

module.exports = transactions;