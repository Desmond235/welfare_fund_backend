
const express = require('express');
const formRouter = express.Router();
const db = require('../../dbConnection')


formRouter.post('/send-details', (req, res) => {
        const data = {
            "fullName": req.body.fullName,
            "dateOfBirth": req.body.dateOfBirth,
            "dateOfRegistration": req.body.dateOfRegistration,
            "amountPaid": req.body.amountPaid,
            "amountInWords": req.body.amountInWords,
            "receiptNumber": req.body.receiptNumber,
            "contact": req.body.contact,
            "houseNo": req.body.houseNo,
            "placeOfAbode": req.body.placeOfAbode,
            "landmark": req.body.landmark,
            "homeTown": req.body.homeTown,
            "region": req.body.region,
            "maritalStatus": req.body.maritalStatus,
            "others": req.body.others,
            "nameOfSpouse": req.body.nameOfSpouse,
            "lifeStatus": req.body.lifeStatus,
            "numberOfChildren": req.body.numberOfChildren,
            "namesOfChildren": req.body.namesOfChildren, // Assuming this is an array
            "occupation": req.body.occupation,
            "fatherName": req.body.fatherName,
            "fLifeStatus": req.body.fLifeStatus,
            "motherName": req.body.motherName,
            "mLifeStatus": req.body.mLifeStatus,
            "nextOfKin": req.body.nextOfKin,
            "nextOfKinContact": req.body.nextOfKinContact,
            "classLeader": req.body.classLeader,
            "classLeaderContact": req.body.classLeaderContact,
            "orgOfMember": req.body.orgOfMember,
            "orgLeaderContact": req.body.orgLeaderContact
        };

        console.log(data);

        const query = 'INSERT INTO membership VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
        const values = [
           null, req.body.fullName, req.body.dateOfBirth, req.body.dateOfRegistration, req.body.amountPaid,
            req.body.amountInWords, req.body.receiptNumber, req.body.contact, req.body.houseNo,
            req.body.placeOfAbode, req.body.landmark, req.body.homeTown, req.body.region, req.body.maritalStatus,
            req.body.others, req.body.nameOfSpouse, req.body.lifeStatus, req.body.numberOfChildren,
            req.body.namesOfChildren, // Assuming namesOfChildren is an array
            req.body.occupation, req.body.fatherName, req.body.fLifeStatus, req.body.motherName, req.body.mLifeStatus,
            req.body.nextOfKin, req.body.nextOfKinContact, req.body.classLeader, req.body.classLeaderContact,
            req.body.orgOfMember, req.body.orgLeaderContact
        ];


        db.query(query, values, (err, result) => {
            if (err) {
                return res.status(400).json({
                    message: err.message || 'Something went wrong'
                });
            }
            return res.status(200).json({
                message: "records sent successfully"
            });
        });
     
})

module.exports = formRouter;