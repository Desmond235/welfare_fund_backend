const express = require('express');
const adminCredentialsRouter = express.Router();
const verify = require('../credentials/verify_credentials');
const update = require('../credentials/update_credentials');
const addCredentials = require('../credentials/add_credentials');

adminCredentialsRouter.post('/login', verify.verifyCredentials);
adminCredentialsRouter.post('/update-credentials', update.updateCredentials);
adminCredentialsRouter.post('/add-credentials',addCredentials.addCredentials );

module.exports = adminCredentialsRouter;