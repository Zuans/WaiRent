const HttpException = require('../utils/HttpExeception.utils');
const jwt = require('jsonwebtoken');
const userModel = require('../model/user.model');
const dotenv = require('dotenv');
dotenv.config();

const auth = (...roles) => {
    return async function(req,res,next) {
        const token = req.cookies.token;
        try {
            if(!token) throw new HttpException(401,'Access Denied  no credential available');
            const user = await userModel.findByJWT(token);
            if (!user) {
                throw new HttpException(401,'Authentication Failed');
            }
    
            // Fix Authentication LOGIC 
            if( roles.length && !roles.includes(user.role)) {
                throw new HttpException(401,'Unauthorized');
            }
    
            req.currentUser = user;
            next();
        } catch(err) {
            console.log(err);
            err.status = 401;
            next(err)
        }
    }
}

module.exports = auth;