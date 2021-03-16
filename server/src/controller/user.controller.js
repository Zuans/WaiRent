// Declare Package
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userModel = require('../model/user.model');
const HttpException = require('../utils/HttpExeception.utils');
const { createHashPassword,checkValidation } = require('../utils/common.utils');
const { Result, query, body } = require('express-validator');
const { sendResponses } = require("../utils/common.utils");
const tagModel = require('../model/tag.model');
const { all } = require('../routes/api_v1/userRoutes');


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
        const token = jwt.sign({
                user_id : user.id.toString(),
                user_role : user.role 
            },secretKey,{ expiresIn : '1d' });
        
        // send cookie
        res.cookie("token",token,{ maxAge : 1000 * 60 * 60 * 24, httpOnly : true });

        res.status(200).send({
            msg : 'Success login',
            status : "success",
        });
    }

    

    async create(req,res,next)  {
        checkValidation(req);
        // check if role user specified
        req.body.role = !req.body.role ? 'User' : req.body.role;
        const hashPassword = await createHashPassword(req.body.password);
        req.body.password = hashPassword;
        const created = await userModel.create(req.body);
        // Check if created us success;
        if(!created) {
            throw new HttpException(500,'Something went wrong');
        }

        const user =  await UserController.getUserByEmail(req.body.email);

        const secretKey = process.env.JWT_SECRET || " ";
        const token  = jwt.sign({
            user_id : user.id.toString(),
            user_role : user.role
        },secretKey,{ expiresIn : "1h" });

        // send cookie
        res.cookie("token",token,{ maxAge : 1000 * 60 * 60 * 24, httpOnly : true });

        res.status(200).send({
            user,
            token,
            message : "User has benn created",
            data : null,
            status : "success",
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


    async update(req,res) {
        checkValidation(req);
        // compare input password and password from DB 
        const {
            password,
            ...userWithoutPass
        } =  req.body;
        const { id : userId } = req.currentUser;
        const user = await userModel.findById({ id : userId });
        const isCorrectPassword = await bcrypt.compare(password,user.password);
        if(!isCorrectPassword) throw new HttpException(401,"Incorrect Password");

        // Create hashPassword and replace req.body.password
        const hashPassword = await createHashPassword(password);
        req.body.password = hashPassword;

        // Update user
        const updatedUser = await userModel.updateById(req.body,{ id : userId });
        if(!updatedUser) throw new HttpException(500);

        sendResponses(res,null,"Edit Profile success");
    }

    async getTag(req,res) {
        const  { id : userId } = req.currentUser;
        const rawTags = await userModel.getFavTagById(userId);
        const tagsVal = Object.values(rawTags).filter( tag => tag !==  null );
        const tags = await tagModel.findTags(tagsVal);
        const allTag = tagsVal.map((tag,index) => {
            return {
                value : tag,
                name : tags[index].name,
            }
        });
        sendResponses(res,allTag);
    }

    async changeTag(req,res) {
        const { id : userId } = req.currentUser;
        if(!userId) throw new HttpException(401,"Unauthorized");
        const {allTag} = req.body;
        const result = await userModel.changeFavTag(userId,allTag);
        if(!result) throw new HttpException(500);
        sendResponses(res,"Favorite tag has updated");
    }

    async changePassword(req,res) {
        // Check validatio from express-validator
        checkValidation(req);

        const currentPass = req.body["current-password"];
        const newPass = req.body["new-password"];

        const { id : userId } = req.currentUser;
        const user = await userModel.findById({ id : userId });
        //  Validation for password and create password
        const isPasswordSame = await bcrypt.compare(currentPass,user.password);
        if(!isPasswordSame) throw new HttpException(401,'Incorrect Password'); 
        const hashPassword = await createHashPassword(newPass);
        // Change password
        const result = await userModel.changePassword(hashPassword,userId);
        if(!result) throw new HttpException(500);
        sendResponses(res,null,"Password has changed");
    }


}


module.exports = new UserController;