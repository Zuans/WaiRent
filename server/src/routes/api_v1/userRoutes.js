// Packeage declare
const express = require('express');
const router = express.Router();


// Import Middleware
const { 
    createUserSchema,
    loginUserSchema, 
    changePassSchema,
    editProfileSchema
} = require('../../middleware/validators/userValidator.middleware');
const auth = require('../../middleware/auth.middleware');

// Import Controlerr
const UserController = require('../../controller/user.controller');
const awaitHandlerFactory = require('../../middleware/awaitHandlerFactory.middleware');


router.post('/login',loginUserSchema,awaitHandlerFactory(UserController.auth));

router.post('/signup',createUserSchema,awaitHandlerFactory(UserController.create));

router.get('/tag',auth("user","admin"),awaitHandlerFactory(UserController.getTag));

router.patch('/',auth("user","admin"),editProfileSchema,awaitHandlerFactory(UserController.update));

router.patch("/tag",auth("user,admin"),awaitHandlerFactory(UserController.changeTag));

router.patch("/password",changePassSchema,auth("user","admin"),awaitHandlerFactory(UserController.changePassword));

router.delete('/delete/:id',awaitHandlerFactory(UserController.delete));

module.exports = router;