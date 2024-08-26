const express = require('express');
const getMembersRouter = express.Router();
const getMembers = require('../getMembers/get_members');
const search =require('../getMembers/search_members');
const totalMembers = require('../getMembers/total_members');
const countGender = require('../getMembers/get_gender');

getMembersRouter.get('/get-members', getMembers.getAllMembers);
getMembersRouter.get('/search-members', search.searchMembers);
getMembersRouter.get('/total-members', totalMembers);
getMembersRouter.get('/count-gender', countGender);

module.exports = getMembersRouter;