const jwt = require("jsonwebtoken")
const User = require("./model/User")
exports.protect = async (req, res, next) => {
    try {
        if (req.headers.authorization) {
            const token = req.headers.authorization.split(" ")[1]
            const { id, iat } = jwt.verify(token, process.env.JWT_SECRET)
            const currentUser = await User.findById(id)
            if (currentUser) {
                const timePasswordChange = parseInt(currentUser.passwordChangedAt.getTime() / 1000, 10)
                if (timePasswordChange < iat) {
                    req.user = currentUser
                    next()
                } else {
                    res.status(401).json({ errors: 'the passwerd is changed, please login agin...' })
                }
            }
            else {
                res.status(401).json({ errors: "this user is not exist." })
            }
        } else {
            res.status(401).json({ errors: "you are not login." })
        }
    } catch (error) {
        res.status(400).json({ errors: error.message })
    }
}