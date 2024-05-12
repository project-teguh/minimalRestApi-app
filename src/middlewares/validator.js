const validator = require('validator');

const registerValidator = async (req, res, next) => {
    const {firstname, username, email, password} = req.body;

    if (!firstname || !username || !password || !email) {
        return res.status(400).send({
            message: 'Username, password, and email are required'
        })
    }

    const isValidEmail = validator.isEmail(email, {host_whitelist: [
            'gmail.com',
            'outlook.com',
            'hotmail.com',
            'live.com',
            'msn.com',
            'yahoo.com'
        ]
    });
    if (!isValidEmail) {
        return res.status(400).send(
            {
                message: 'Email is not valid, use only gmail.com or all email related to microsoft account'
            }

        );
    }

    const isValidPwd = validator.isStrongPassword(password);
    if (!isValidPwd) {
        return res.status(400).send(
            {
                message: 'Weak password! Required minimum 8 characters, uniquelly symbols and numbers plus capslock!'
            }
        )
    }
    next();
};

module.exports = {registerValidator}