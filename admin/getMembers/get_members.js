const db = require("../../dbConnection");

const getMembers = {
    getAllMembers:  (req, res) =>{

        try {
            db.query("SELECT * FROM membership", (err, result) =>{
                const data = result;
                if(err){
                  return res.status(400).json({
                      error: "An error occurred while fetching data from the database",
                  })
                }
    
                return res.status(200).json({
                    message: "Members fetched successfully",
                    data: data
                })
            })
        } catch (error) {
            res.status(500).json({
                error: true,
                message: error.message ||  "internal server error"
            })
        }
    }
}

module.exports = getMembers;