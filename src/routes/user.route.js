const express = require('express');
const { register, login, allUsers} = require('../controllers/user.controller');
const { verify } = require('../middlewares/verifytoken');
const { registerValidator } = require('../middlewares/validator');

const router = express.Router();

router.post('/register', registerValidator, register); //note: gunakan method post untuk mengirim data sensitif (username, pw etc)
router.get('/all', verify, allUsers);
router.post('/login', login);

module.exports = router;