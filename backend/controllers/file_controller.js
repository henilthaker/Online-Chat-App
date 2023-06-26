// imports
require('dotenv').config();
const mongoose = require('mongoose');
const grid = require('gridfs-stream');

const port = process.env.PORT || 4000;
const base_url = 'http://localhost:' + port;
const connection = mongoose.connection;

let gfs, gridfs_bucket;
connection.once('open', () => {
    gridfs_bucket = new mongoose.mongo.GridFSBucket(connection.db, {
        bucketName: 'fs'
    });
    gfs = grid(connection.db, mongoose.mongo);
    gfs.collection('fs');
})
const uploadFile = (req, res) => {
    if (!req.file)
        return res.status(404).json('file not found');
    const file_url = `${base_url}/api/file/${req.file.filename}`;
    res.status(200).json(file_url);
}

const getFile = async (req, res) => {
    try {
        const required_file = await gfs.files.findOne({ filename: req.params.filename });

        const download_stream = gridfs_bucket.openDownloadStream(required_file._id);
        download_stream.pipe(res);
    } catch (error) {
        response.status(500).json(error);
    }
}

module.exports = { uploadFile, getFile };