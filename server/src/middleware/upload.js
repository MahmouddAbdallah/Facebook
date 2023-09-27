const multer = require("multer");

const upload = (upload) => {
    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, "./upload")
        },
        filename: function (req, file, cb) {
            const fileExtention = file.originalname.split(".")
            const filename = parseInt(Date.now() / 1000) + `.${fileExtention[fileExtention.length - 1]}`;
            cb(null, filename)
        }
    })
    return multer({ storage }).single(upload)
}
module.exports = upload