const express = require('express');
const getMembersRouter = express.Router();
const getMembers = require('../getMembers/get_members');

getMembersRouter.get('/get-members', getMembers.getAllMembers);

module.exports = getMembersRouter;