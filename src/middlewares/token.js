require ('dotenv').config();    
const jwt = require('jsonwebtoken');
const {user} = require('../models');

const verifyToken = async (req, res, next) => { 
    //param next: pada express js untuk meneruskan/melanjutkan proses dari controller/middleware ke ../.. yg lainya 
    try {
        const token = req.headers["authorization"];
        
        if (!token) { // cek token login untuk akses data ada atau tidak
            return res.status(403).send(
                {
                    message: "No Token Provided"
                }
            );
        }
        
        const  checkToken = jwt.verify(token.split(" ")[1], process.env.JWT_SECRET) //cek/verifikasi token sesuai tidak
        // console.log(checkToken);
        if (!checkToken) {
            return res.status(403).send(
                {
                    message: "Failed to authenticate jwt"
                }
            )
        }

        req.user = checkToken

        next();
    } catch (error) {
        res.status(403).send(
            {
            message: error
            }
        )
    }
}

module.exports = {verifyToken};