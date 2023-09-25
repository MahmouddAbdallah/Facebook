const { check } = require("express-validator")
const { validationMiddleware } = require("../../middleware/validationResult")
const User = require("../../model/User")

exports.registerValdator = [
    check("first_name")
        .notEmpty()
        .withMessage("first_name is required"),
    check("last_name")
        .notEmpty()
        .withMessage("last_name is required"),
    check("email")
        .notEmpty()
        .withMessage("email is required")
        // .isEmail()
        // .withMessage("this is not valid email")
        .custom(async (value, { req }) => {
            try {
                const { email } = req.body
                const user = await User.findOne({ email })
                if (user) {
                    return Promise.reject(new Error('this email is created'))
                }
            } catch (error) {
                console.error(error);
            }
        }),
    check("password")
        .notEmpty()
        .withMessage("password is required")
        .isStrongPassword()
        .withMessage("is not strong password add char and symbol and num")
    , check("gender")
        .notEmpty()
        .withMessage("gender is required")
        .custom(async (value) => {
            try {
                const gender = value == "male" ? true : value == "female" ? true : false
                if (!gender) {
                    return Promise.reject(new Error('Gender field must be male or female'))
                }
            } catch (error) {
                console.error(error);
            }
        }),
    check("byear")
        .notEmpty()
        .withMessage("bearth day is required"),
    check("bmonth")
        .notEmpty()
        .withMessage("bearth day is required"),
    check("bday")
        .notEmpty()
        .withMessage("bearth day is required")
    , validationMiddleware
]
exports.loginValdator = [
    check("email")
        .notEmpty()
        .withMessage("please enter your email")
        .isEmail()
        .withMessage("this is not valid email")
        .custom(async (value, { req }) => {
            try {
                const { email } = req.body
                const user = await User.findOne({ email })
                if (!user) {
                    return Promise.reject(new Error('this email is not created'))
                }
            } catch (error) {
                console.error(error);
            }
        }),
    check("password")
        .notEmpty()
        .withMessage("please enter your password")
    , validationMiddleware
]