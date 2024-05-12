const express = require('express');
const { register, login, allUsers, addProfile} = require('../controllers/user.controller');
const { verify } = require('../middlewares/verifytoken');
const { registerValidator, loginValidator } = require('../middlewares/validator');
const { uploadImgProfile } = require('../middlewares/upload');

const router = express.Router();

router.post('/register', registerValidator, register); //note: gunakan method post untuk mengirim data sensitif (username, pw etc)
router.get('/all', verify, allUsers);
router.post('/login',loginValidator, login);
router.post('/uploadprofile', verify, uploadImgProfile.single('foto'), addProfile)
module.exports = router;