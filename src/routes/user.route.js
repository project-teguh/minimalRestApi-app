const express = require('express');
const { register, login, allUsers, addImgProfile, myprofile, updateUser} = require('../controllers/user.controller');
const { verifyToken } = require('../middlewares/token');
const { registerValidator, loginValidator } = require('../middlewares/validator');
const { uploadImgProfile } = require('../middlewares/upload');
const { authorizeAdmin, authorizeUser } = require('../middlewares/authorization');

const router = express.Router();

router.post('/register', registerValidator, register); //note: gunakan method post untuk mengirim data sensitif (username, pw etc)
router.get('/all', verifyToken, allUsers);
router.post('/login',loginValidator, login);
router.post('/uploadprofile', verifyToken, uploadImgProfile.single('foto'), addImgProfile)
router.get('/profile', verifyToken, myprofile)
router.put('/:id/update', authorizeAdmin, updateUser)
router.delete('/:id/delete', authorizeUser, updateUser)

module.exports = router;