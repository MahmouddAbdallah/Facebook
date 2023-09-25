const User = require("../model/User");
const ApiFeatures = require("../utils/Api");
const { getOne, deleteOne } = require("./factory");

exports.getUsers = async (req, res, next) => {
    try {
        const ApiF = new ApiFeatures(User, req)
            .filters()
            .sort()
            .search()
            .fields()
        const doc = await ApiF.Model
        res.status(200).json({ data: doc })
    } catch (error) {
        res.status(400).json({ errors: error })
    }
}
exports.updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { ...body } = req.body
        body.picture = req.file.filename
        const doc = await User.findByIdAndUpdate(id, body, { new: true })
        res.status(200).json({ data: doc })
    } catch (error) {
        res.status(400).json({ errors: error })
    }
}

exports.getUser = getOne(User)
exports.deleteUser = deleteOne(User)