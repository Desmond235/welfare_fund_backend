const express = require('express');
const adminCredentialsRouter = express.Router();
const verify = require('../credentials/verify_credentials');
const update = require('../credentials/update_credentials');

adminCredentialsRouter.post('/verify-credentials', verify.verifyCredentials);
adminCredentialsRouter.post('/update-credentials', update.updateCredentials);

module.exports = adminCredentialsRouter;