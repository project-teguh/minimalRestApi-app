const multer = require('multer');

const uploadProfileDir = `${process.cwd()}/uploads/profile`
const uploadDocDir = `${process.cwd()}/uploads/doc`

const uploadImgProfile = multer({dest: uploadProfileDir});
const uploadDoc = multer({dest: uploadDocDir});

module.exports = {uploadImgProfile, uploadDoc}