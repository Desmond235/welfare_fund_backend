
const express = require('express');
const formRouter =  express.Router();
const form = require('../controllers/controller')

formRouter.post('/send-details', form);

module.exports = formRouter;