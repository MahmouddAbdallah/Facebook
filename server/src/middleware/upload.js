const multer = require("multer");
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./upload")
    },
    filename: function (req, file, cb) {
        const filename = parseInt(Date.now() / 1000) + ".jpg";
        cb(null, filename)
    }
})
const upload = (upload) => {
    return multer({ storage }).single(upload)
}
module.exports = upload