const express = require('express');
const updateMembersRouter = express.Router();
const updateMembers = require('../controllers/update_members')

updateMembersRouter.post('/update-members/:id', updateMembers.updateMembership);

module.exports = updateMembersRouter