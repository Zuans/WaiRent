const HttpException = require('../utils/HttpExeception.utils');
const jwt = require('jsonwebtoken');
const userModel = require('../model/user.model');
const dotenv = require('dotenv');
dotenv.config();

const auth = (...roles) => {
    return async function(req,res,next) {
        const authHeader = req.headers.authorization;
        try {
            if(!authHeader) throw new HttpException(401,'Access Denied  no credential available');
            const token = authHeader.split(" ")[1];
            const JWTSecret = process.env.JWT_SECRET;
            const decoded = jwt.verify(token,JWTSecret);
            const user = userModel.findOne({ id : decoded.user_id });
            if (!user) {
                throw new HttpException(401,'Authentication Failed');
            }
    
            // If owner same as decode token id
            const ownerAuth  = req.params.id === user.id;
            if( ownerAuth && roles.length && !roles.includes(user.role)) {
                throw new HttpException(401,'Unauthorized');
            }
    
            req.currentUser = user;
            next();
        } catch(err) {
            err.status = 401;
            next(err)
        }
    }
}

module.exports = auth;