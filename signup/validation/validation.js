const {check } = require("express-validator");

const signupValidation = [
    check("username", "username is required").not().isEmpty(),
    check("email", "email is required").isEmail().normalizeEmail({gmail_remove_dots: true}),
    check("password", "password is required").not().isEmpty(),
    check("password", "password must be more than 6 characters").isLength({min:6})
];

const loginValidation = [
    check("email", "email is required").isEmail().normalizeEmail({gmail_remove_dots: true}),
    check("password", "password is required").not().isEmpty(),
    check("password ", "password must be more than 6 characters").isLength({min:6})
];

module.exports = {
    signupValidation,
    loginValidation
};