const multer = require('multer');
const MIME_TYPES = require('../Config/multer.config');
const path = require('path');

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, path.join(__dirname, '../../public/uploads/'));
    },
    filename: (req, file, callback) => {
        const name = file.originalname;
        const extension = MIME_TYPES[file.mimetype];
        callback(null, name + Date.now() + '.' + extension);
    }
})

module.exports = multer({storage: storage});