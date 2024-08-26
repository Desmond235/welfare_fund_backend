const db = require('../../dbConnection');

const search = {
    searchMembers: async (req, res) => {
        const searchQuery = req.query.search || ''
        const query = `SELECT * FROM membership WHERE full_name LIKE ? OR date_of_birth LIKE ?
        OR date_of_registration LIKE ? OR contact LIKE ? OR house_number LIKE ? OR place_of_abode LIKE ? OR land_mark LIKE ?
         OR home_town LIKE ? OR region LIKE ? OR marital_status LIKE ? OR name_of_spouse LIKE ?
         OR life_status LIKE ? OR occupation LIKE ? OR fathers_name LIKE ? OR father_life_status LIKE ?
         OR mothers_name LIKE ? OR mother_life_status LIKE ? OR next_of_kin LIKE ? OR next_of_kin_contact LIKE ?
         OR class_leader LIKE ? OR class_leader_contact LIKE ? OR organization_of_member LIKE ?
         OR org_leader_contact LIKE?`;
        const searchValue = [`%${searchQuery}%`];

        db.query(
            query,
            [searchValue, searchValue, searchValue, searchValue, searchValue, searchValue, 
             searchValue, searchValue, searchValue, searchValue, searchValue, searchValue, 
             searchValue, searchValue, searchValue, searchValue, searchValue, searchValue, 
             searchValue, searchValue, searchValue, searchValue, searchValue, searchValue],
            (err, result) => {
                if (err) {
                    return res.status(400).json({
                        message: "An error occurred"
                    });
                } else {
                    res.json(result);
                }
            }
        )
    }
}

module.exports = search;