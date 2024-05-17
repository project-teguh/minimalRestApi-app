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

const login = async (req, res) => {
    

    //yg dikoment sudah dipindah ke validator.js
    // const { username, password} = req.body;
    
    // const getUser = await user.findOne({
    //     where: {
    //         username: username
    //     }
    // })
    
    
    // if (!getUser) {
    //     return res.status(400).send(
    //         {
    //             message: 'Incorrect Username!'
    //         }
    //     );
    // } 

    // const comparedPwd = bcrypt.compareSync(password, getUser.dataValues.password);
    // if (!comparedPwd) {
    //     return res.status(400).send(
    //         {
    //             message: 'Incorrect Password!'
    //         }
    //     );
    // }
    // console.log('Login data (getUser) :>> ', getUser.dataValues);
    // console.log('Login data (req.body) :>> ', req.body);
    const data = req.userInfo
    const token = jwt.sign({
        id: data.id,
        username: data.username
    }, process.env.JWT_SECRET, {expiresIn: 3600}
);
// console.log(token);

    return res.status(200).send(
        {
            message: 'Login Success',
            data: token
        }
    )        
}

//crud

const allUsers = async (req, res) => {
    const data = await user.findAll();

    return res.status(200).send(
        {
            message: 'All Users data retrieved succesfully',
            data: data
        }
    )
}

const addImgProfile = async (req, res, next) => {
    const userData = req.user;

    const file = req.file;

    const updateField = await user.update({
        picture: file.path
    }, 
    {where: {
        id: userData.id
    }});

    return res.status(201).send({
        message: 'Profile picture uploaded successfully'
    })
}

const myprofile =async (req, res) => {
    try {
        let data = await user.findOne(
            {
                where: {id: req.user.id}
            }
        )

        return res.status(200).send({
            message: 'Get user data successfully',
            data: data.dataValues
        })
    } catch (error) {
        res.status(500).send({
            code:500,
            status: false,
            message: error.message,
            data: null
        })
    }
}

const updateUser = async (req, res) => {
    try {
        const {firstname, lastname, username, email} = req.body;
        let data = await user.update(
            {
                firstname: firstname,
                lastname: lastname,
                username: username,
                email: email
            },
            {
                where: {
                    id: req.user.id
                }
            }
        )

        let getId = await user.findOne(
            {
                where: {
                    id: req.user.id
                }
            }
        )

        return res.status(201).send({
            message: 'User data updated successfully',
            data: getId.dataValues
        });
    } catch (error) {
        res.status(500).send(
            {
                message : error.message,
                code    : 500,
                status  : false,
                data    : null
            }
        )
    }
};

module.exports = {register, login, allUsers, addImgProfile, myprofile, updateUser};