const bcrypt = require('bcrypt')
const User = require("../model/User");
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
    try {
        const { ...body } = req.body
        body.password = await bcrypt.hash(body.password, 10)
        const fields = { ...body }
        const user = await User.create(fields)
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)
        res.status(200).json({ token, user })
    } catch (error) {
        res.status(400).json({ errors: error });
    }
}
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body
        const user = await User.findOne({ email });
        const isMatch = await bcrypt.compare(password, user.password)
        if (isMatch) {
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)
            res.status(200).json({ token, user })
        } else {
            return res.status(400).json({ errors: " this password is not correct" })
        }
    } catch (error) {
        res.status(400).json({ errors: error });
    }
}