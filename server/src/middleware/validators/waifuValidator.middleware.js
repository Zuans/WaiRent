const { body } = require('express');
const { check } = require('express-validator');



const waifuFilterSchema = [
    check('waifu-name')
        .exists()
        .withMessage('harus ada'),
    check('waifu-max-age')
        .isFloat({ min : 0, max : 70 })
        .withMessage('wrong input age'),
    check('waifu-min-age')
        .isFloat({ min : 0, max : 70})
        .withMessage('wrong input age')
        .custom((value,{req}) => value > req.body['waifu-max-age'])
        .withMessage('min age cannot be greater than max age !')
]

module.exports = {
    waifuFilterSchema
};