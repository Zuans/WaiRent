// Declare Package
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const userModel = require('../model/user.model');
const HttpException = require('../utils/HttpExeception.utils');
const { createHashPassword,checkValidation } = require('../utils/common.utils');


class UserController {
    
    static async getUserById(id) {
        const user = await userModel.findById(id);
        if(!user) {
            throw new HttpException(404,'User do not exist!');
        }
        const { password,...userWithoutPass } = user;
        return userWithoutPass;
    }

    static async getUserByUsername(username)  {
        const user = await userModel.findOne({ username });
        if(!user) {
            throw new HttpException(404,'User do no exist');
        }
        const { password,...userWithoutPass } = user;
        return userWithoutPass;
    }

    static async getUserByEmail (email) {
        const user = await userModel.findOne({ email });
            if(!user) {
                throw new HttpException(404,'User do not exist');
            }
            const { pasword,...userWithoutPass} = user;
            return userWithoutPass;
    }

    login (req,res) {
        res.status(200).send('ini adalah halaman login');
        // Render login page 
    }

    async auth(req,res,next)  {
        checkValidation(req);
        const { email,password } = req.body;
        const user = await UserController.getUserByEmail(email);
        if(!user) {
            throw new HttpException(404,'User do not exist!');
        }
        const validPassword = await bcrypt.compare(password,user.password);
        if(!validPassword) {
            throw new HttpException(401,'Incorrect password');
        }

        // user matched make JWT token
        const secretKey = process.env.JWT_SECRET || "";
        const token = jwt.sign({user_id : user.id.toString() },secretKey,{
            expiresIn : '1h',
        });

        const {
            password : userPassword,
            ...userWithoutPass} = user;

        
        res.status(200).send({
            user: userWithoutPass,
            token : token,
            msg : 'Success login',
        });
    }

    
    signup(req,res)  {
        res.status(200).send('ini adalah halaman signup');
        // Render signup page
    }

    async create(req,res,next)  {
        checkValidation(req);
        // check if role user specified
        req.body.role = !req.body.role ? 'User' : req.body.role;
        const hashPassword = await createHashPassword(req.body.password);
        req.body.password = hashPassword;
        console.log(req.body);
        const created = await userModel.create(req.body);
        // Check if created us success;
        if(!created) {
            throw new HttpException(500,'Something went wrong');
        }
        res.status(200).send({
            message : "Data Berhasil dibuat",
            data : null,
        });
    }

    async delete(req,res) {
        const id = req.params.id;
        const deleted = await userModel.deleteById({ id });
        if(!deleted) {
            throw new HttpException(500,'Something went wrong');
        };

        return res.status(200).send({
            status : 'success',
            msg : `user with id ${id} has been deleted`,
        });
    }



}


module.exports = new UserController;