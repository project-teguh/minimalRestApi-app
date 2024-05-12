const validator = require('validator');
const {user} = require('../models');
const bcrypt = require('bcrypt');

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

const loginValidator = async (req, res, next) => {
    const {username, password} = req.body;

    const getUser = await user.findOne(
        {
            where: {
                username: username
            }
        }
    );

    if (!getUser) {
        return res.status(400).send({
            message: 'Error, user not found!'
        })
    }

    const dataUser = getUser.dataValues

    const comparedPwd = bcrypt.compareSync(password, dataUser.password);
    if (!comparedPwd) {
        return res.status(400).send(
            {
                message: 'Incorrect Password!'
            }
        );
    }

    req.userInfo = dataUser
    next();
};

module.exports = {registerValidator, loginValidator}