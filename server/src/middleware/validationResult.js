const { validationResult } = require("express-validator");

exports.validationMiddleware = (req, res, next) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
        return res.status(400).json({ errors: result.array()[0].msg });
    }
    next()
}