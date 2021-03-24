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
    check("startDate")
        .exists()
        .withMessage("Start Date field is required"),
    check("endDate")
        .exists()
        .withMessage("end date field is required"),
    check("amount")
        .exists()
        .withMessage("Amount field is required")
        .isFloat({ min :  1})
        .withMessage("Wrong input type")
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
    check("startDate")
        .exists()
        .withMessage("Start Date field is required"),
    check("endDate")
        .exists()
        .withMessage("end date field is required"),
    check("status")
        .exists()
        .withMessage("status input is required"),
    check("amount")
        .exists()
        .withMessage("Amount field is required")
        .isFloat({ min :  1})
        .withMessage("Wrong input type")
]


module.exports = {
    createCartSchema,
    updateCartSchema
}