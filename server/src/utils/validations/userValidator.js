const { check } = require('express-validator')
const { validationMiddleware } = require("../../middleware/validationResult")
exports.updateUserValidator = [
    check('id')
        .isMongoId()
        .withMessage("invaild id"),
    check("gender")
        .optional()
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
        })
    , validationMiddleware
]
exports.getUserValidator = [
    check('id')
        .isMongoId()
        .withMessage("invaild id")
    , validationMiddleware
]