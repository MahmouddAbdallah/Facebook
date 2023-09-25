exports.createOne = Model => (
    async (req, res) => {
        try {
            const { ...body } = req.body
            body.photo = req.file.filename
            const doc = await Model.create(body)
            res.status(200).json({ data: doc })
        } catch (error) {
            res.status(400).json({ errors: error })
        }
    }
)
exports.getOne = Model => (
    async (req, res) => {
        try {
            const { id } = req.params;
            const doc = await Model.findById(id);
            if (!doc) {
                res.status(400).json({ errors: "this document is not fond" })
            }
            res.status(200).json({ data: doc })
        } catch (error) {
            res.status(400).json({ errors: error })
        }
    }
)
exports.updateOne = Model => (
    async (req, res) => {
        try {
            const { id } = req.params;
            const { ...body } = req.body
            const doc = await Model.findByIdAndUpdate(id, body, { new: true })
            console.log(doc);
            res.status(200).json({ doc })
        } catch (error) {
            res.status(400).json({ errors: error })
        }
    }
)
exports.deleteOne = Model => (
    async (req, res) => {
        try {
            const { id } = req.params;
            const doc = await Model.findByIdAndDelete(id)
            res.status(200).json({ doc })
        } catch (error) {
            res.status(400).json({ errors: error })
        }
    }
)