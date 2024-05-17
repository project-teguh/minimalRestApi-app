require ('dotenv').config();    
const {user} = require('../models');

const authorizeAdmin = async (req, res, next) => {
    let isAdmin = await user.findOne({
        where:{
            id: req.user.id
        }
    })

    if (isAdmin.dataValues.roles !== "boss") {
        return res.status(403).send({
            message:"forbidden. An unauthorized action"
        })
    }

    next();
}

const authorizeUser =  async (req, res, next) => {
    if (req.params.id != req.user.id) {
        return res.status(403).send(
            {
                message: 'Forbidden. You can not do this action'
            }
        );
    }

    next
}

module.exports = {authorizeAdmin, authorizeUser};