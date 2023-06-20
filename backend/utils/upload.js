// imports
require('dotenv').config();
const multer = require('multer');
const { GridFsStorage } = require('multer-gridfs-storage');
const url = process.env.MONGO_URI;

// create a storage object with a given configuration
const storage = GridFsStorage({
    url,
    file: (req, file) => {
        return {
            filename: file.originalname + 'file_' + Date.now()
        };
    }
});

// set multer storage engine to newly created object
const upload = multer({storage});

module.exports = upload;