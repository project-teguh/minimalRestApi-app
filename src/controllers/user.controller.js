const bcrypt = require('bcrypt');
const {user} = require('../models');
const jwt = require('jsonwebtoken');

const register = async (req, res) => {
    const {firstname, lastname, username, email, password} = req.body;

    const hashedPwd = bcrypt.hashSync(password, 8);
    // console.log(password, hashPassword);
    const data = await user.create({
        firstname: firstname,
        lastname: lastname,
        username: username,
        email: email,
        password:  hashedPwd,
        // roles: roles
    })
    return res.status(201).send({
        message: 'User created successfully'
    })
}

const allUsers = async (req, res) => {
    const data = await user.findAll();

    return res.status(200).send(
        {
            message: 'All Users data retrieved succesfully',
            data: data
        }
    )
}

const login = async (req, res) => {
    const { username, password} = req.body;
    
    
    const getUser = await user.findOne({
        where: {
            username: username
        }
    })
    
    
    if (!getUser) {
        return res.status(400).send(
            {
                message: 'Incorrect Username!'
            }
        );
    } 

    const comparedPwd = bcrypt.compareSync(password, getUser.dataValues.password);
    if (!comparedPwd) {
        return res.status(400).send(
            {
                message: 'Incorrect Password!'
            }
        );
    }
    // console.log('Login data (getUser) :>> ', getUser.dataValues);
    // console.log('Login data (req.body) :>> ', req.body);

    const token = jwt.sign({
        id: getUser.dataValues.id,
        username: getUser.dataValues.username
    }, process.env.JWT_SECRET, {expiresIn: 30}
);
console.log(token);

    return res.status(200).send(
        {
            message: 'Login Success',
            data: token
        }
    )        
}

module.exports = {register, login, allUsers}