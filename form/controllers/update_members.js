const db = require('../../dbConnection')

const updateMembers = {
    updateMembership: async (req, res) => {
        const { id } = req.params;
        console.log(id);
        const { fullName, dateOfBirth, dateOfRegistration,
            contact, houseNo, placeOfAbode, landmark, homeTown, region,
            maritalStatus, nameOfSpouse, lifeStatus, occupation, fatherName, fLifeStatus, motherName,
            mLifeStatus, nextOfKin, nextOfKinContact, classLeader,
            classLeaderContact, orgOfMember, orgLeaderContact } = req.body;

       

        const query = 'UPDATE `membership` SET `full_name` = ?, `date_of_birth` = ?, `date_of_registration` = ?,' +
            '`contact` = ?, `house_number` = ?, `place_of_abode` = ?, `land_mark` = ?, `home_town` = ?, `region` = ?, `marital_status` = ?,' +
            '`name_of_spouse` = ?, `life_status` = ?, `occupation` = ?, `fathers_name` = ?, father_life_status = ?, `mothers_name` = ?,' +
            '`mother_life_status` = ?, `next_of_kin` = ?, `next_of_kin_contact` = ?, `class_leader` = ?, `class_leader_contact` = ?, ' +
            '`organization_of_member` = ?, `org_leader_contact` = ?  WHERE `membership`.`id` = ?;';

        const values = [fullName, dateOfBirth, dateOfRegistration, contact, houseNo, placeOfAbode, landmark,
            homeTown, region, maritalStatus, nameOfSpouse, lifeStatus, occupation, fatherName, fLifeStatus,
            motherName, mLifeStatus, nextOfKin, nextOfKinContact, classLeader, classLeaderContact, orgOfMember,
            orgLeaderContact, parseInt(id)];

        db.query(query, values,
            (err, result) => {
                console.log('query', query);
                console.log('values', values);
                if (err) {
                    return res.status(400).json({
                        message: err.message || 'An error occurred while updating data in the database'
                    });
                }

                if (result.affectedRows === 0) {
                    return res.status(404).json({
                        message: 'No member found with the provided ID'
                    })
                }
                return res.status(200).json({
                    message: 'Member updated successfully',
                    data: {
                        id:                        id,
                        fullname:                  fullName,
                        dateOfBirth:               dateOfBirth,
                        dateOfRegistration:        dateOfRegistration,
                        contact:                   contact,
                        house_number:              houseNo,
                        place_of_abode:            placeOfAbode,
                        land_mark:                 landmark,
                        home_town:                 homeTown,
                        region:                    region,
                        marital_status:            maritalStatus,
                        name_of_spouse:            nameOfSpouse,
                        life_status:               lifeStatus,
                        occupation:                occupation,
                        fathers_name:              fatherName,
                        father_life_status:        fLifeStatus,
                        mothers_name:              motherName,
                        mother_life_status:        mLifeStatus,
                        next_of_kin:               nextOfKin,
                        next_of_kin_contact:       nextOfKinContact,
                        class_leader:              classLeader,
                        class_leader_contact:      classLeaderContact,
                        organization_of_member:    orgOfMember,
                        org_leader_contact:        orgLeaderContact
                    }
                });
            }
        )
    }
}

module.exports = updateMembers;