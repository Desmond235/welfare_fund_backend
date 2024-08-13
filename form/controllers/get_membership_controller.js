const db = require('../../dbConnection');


const getMemDetails = {
    getMembershipDetails: async (req, res) => {
        const {id} = req.params;
        const query = 'SELECT * FROM membership WHERE id = ?';

        db.query(
            query, 
            [id],

            (err, results) =>{
                 const result = results[0];
                if(err){
                   return res.status(400).json({
                        error: "An error occurred while fetching data from the database",
                    })
                }

                if(results.length === 0){
                  return  res.status(404).json({
                        error: "No user found with this ID",
                        data: result
                    })
                }
                return res.status(200).json({
                    error: false,
                    data: [result],
                    message: 'Users membership details fetched successfully'
                })
            }
        )
    }
}

module.exports = getMemDetails;