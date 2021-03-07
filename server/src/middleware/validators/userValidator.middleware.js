const { body,check } = require('express-validator');
const Role = require('../../utils/userRole.utils');

const createUserSchema = [
    check('username')
        .exists()
        .withMessage('Username field is required')
        .isLength({ min : 2 })
        .withMessage('Username input must be great than two character'),
    check('email')
        .exists()
        .withMessage('Email field is required')
        .isEmail()
        .withMessage('Please input a valid email')
        .normalizeEmail(),
    check('role')
        .optional()
        .isIn([ Role.Admin,Role.User])
        .withMessage('Invalid role type'),
    check('password')
        .exists()
        .withMessage('Password field is required')
        .isLength({ min : 6 })
        .withMessage('Your password must contains at least 6 character')
        .isLength({ max : 12 })
        .withMessage('Password can contain max 12 character'),
    check('confirmPassword')
        .exists()
        .withMessage('Confirm password field is required')
        .custom(( value,{req} ) => value === req.body.password )
        .withMessage('Confirm password must be same value  as the password field')
];

const loginUserSchema = [
    check('email')
        .exists()
        .withMessage('Email field is required')
        .isEmail()
        .withMessage('Email must be valid'),
    check('password')
        .exists()
        .withMessage('Password field is required')
        .isLength({ min : 6 })
        .withMessage('Password can must contain at least 6 character')
        .isLength({ max : 12 })
        .withMessage('Password field can contain max 12 character'),
];


module.exports = {
    createUserSchema,
    loginUserSchema
}