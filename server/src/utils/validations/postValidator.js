const { check } = require('express-validator')
const { validationMiddleware } = require("../../middleware/validationResult")
exports.getPostValidator = [
    check('id').
        isMongoId()
        .withMessage("invaild id")
    , validationMiddleware
]