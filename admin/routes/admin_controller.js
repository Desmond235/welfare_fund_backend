const express = require('express');
const adminCredentialsRouter = express.Router();
const verify = require('../credentials/verify_credentials');
const update = require('../credentials/update_credentials');
const addCredentials = require('../credentials/add_credentials');
const changePassword = require('../credentials/change_password');
const addEmail = require('../credentials/add_email');
const checkEmail = require('../credentials/check_email');


adminCredentialsRouter.post('/login', verify.verifyCredentials);
adminCredentialsRouter.post('/check-email', checkEmail.checkEmail);
adminCredentialsRouter.post('/update-credentials', update.updateCredentials);
adminCredentialsRouter.post('/add-email', addEmail.insertEmail);
adminCredentialsRouter.post('/add-credentials',addCredentials.addCredentials );
adminCredentialsRouter.post('/change-password', changePassword.changePassword);


module.exports = adminCredentialsRouter;