const express = require('express');
const membershipRouter = express.Router();
const getMemDetails = require('../controllers/get_membership_controller')

membershipRouter.get('/get-membership/:id', getMemDetails.getMembershipDetails );

module.exports = membershipRouter;