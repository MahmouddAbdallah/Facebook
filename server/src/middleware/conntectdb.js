const mongoose = require("mongoose")
const connectdb = () => {
    mongoose.connect(process.env.MONGO_URI)
        .then(() => {
            console.log(`connected to db`)
        })
        .catch((error) => {
            console.error(error);
        })
}
module.exports = { connectdb }