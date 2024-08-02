const { eq } = require('lodash');
const db = require('../../dbConnection');


const formData = [];
const form = (err, req, res) => {
    if(err){
        res.status(404).json({
            message: err.message || 'Something went wrong'
        })
    }
    const data = {
        "fullName": req.body.fullName,
        "dateOfBirth": req.body.dateOfBirth,
        "dateOfRegistration": req.body.dateOfRegistration,
        "amountPaid": req.body.amountPaid,
        // "amountInWords": req.body.amountInWords,
        // "receiptNo": req.body.receiptNo,
        // "contact": req.body.contact,
        // "houseNo": req.body.houseNo,
        // "PlaceOfAbode": req.body.placeOfAbode,
        // "landmark": req.body.landmark,
        // "homeTown": req.body.homeTown,
        // "region": req.body.region,
        // "MaritalStatus": req.body.maritalStatus,
        // "others": req.body.others,
        // "nameOfSpouse": req.body.nameOfSpouse,
        // "LifeStatus": req.body.lifeStatus,
        // "NumberOfChildren": req.body.numberOfChildren,
        // "namesOfChildren": [req.body.namesOfChildren],
        // "occupation": req.body.occupation,
        // "fatherName": req.body.fatherName,
        // "fLifeStatus": req.body.fLifeStatus,
        // "motherName": req.body.motherName,
        // "mLifeStatus": req.body.mLifeStatus,
        // "nextOfKin": req.body.nextOfKind,
        // "nextOfKinContact": req.body.nextOfKind,
        // "classLeader": req.body.classLeader,
        // "classLeaderContact": req.body.classLeaderContact,
        // "orgOfMember": req.body.orgOfMember,
        // "orgLeaderContact": req.body.orgLeaderContact,

    }

    formData.push(data);
    console.log(formData);
    db.query('INSERT INTO membership VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?'
        + ', ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
        [
            req.body.fullName, req.body.dateOfBirth, req.body.dateOfRegistration, req.body.amountPaid,
            req.body.amountInWords, req.body.receiptNo, req.body.contact, req.body.houseNo,
            req.body.placeOfAbode, req.body.landmark, req.body.homeTown, req.body.region, req.body.maritalStatus,
            req.body.others, req.body.nameOfSpouse, req.body.lifeStatus, req.body.numberOfChildren,
            req.body.namesOfChildren, req.body.occupation, req.body.fatherName, req.body.fLifeStatus,
            req.body.motherName, req.body.mLifeStatus, req.body.nextOfKin, req.body.nextOfKinContact,
            req.body.classLeader, req.body.classLeaderContact, req.body.orgOfMember,
            req.body.orgLeaderContact,
        ],
        (err, result) => {
            if (err) {
                return res.status(400).json({ 
                    message: err.message || 'Something went wrong'
                 });
            }
            return res.status(200).json({
                message: "records sent successfully"
            });
        }
    )
}
module.exports = form;