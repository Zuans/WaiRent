const { check } = require("express-validator");


const createCartSchema = [
    check("waifuId")
        .exists()
        .withMessage("waifu id field is required"),
    check("duration")
        .exists()
        .withMessage("Duration field is required")
        .isFloat({ min : 1, max : 12 })
        .withMessage("Duration is wrong input or exceed the limit"),
    check("dateTime")
        .exists()
        .withMessage("dateTime input is required")
]


const updateCartSchema = [
    check("waifuId")
        .exists()
        .withMessage("waifu id field is required"),
    check("duration")
        .exists()
        .withMessage("Duration field is required")
        .isFloat({ min : 1, max : 12 })
        .withMessage("Duration is wrong input or exceed the limit"),
    check("dateTime")
        .exists()
        .withMessage("dateTime field is required"),
]

const updateTimeSchema =  [
    check('time')
        .exists()
        .withMessage('time field is required!')
]

module.exports = {
    createCartSchema,
    updateCartSchema,
    updateTimeSchema
}