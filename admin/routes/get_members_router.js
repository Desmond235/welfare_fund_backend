const express = require('express');
const getMembersRouter = express.Router();
const getMembers = require('../getMembers/get_members');
const search =require('../getMembers/search_members');

getMembersRouter.get('/get-members', getMembers.getAllMembers);
getMembersRouter.get('/search-members', search.searchMembers);

module.exports = getMembersRouter;