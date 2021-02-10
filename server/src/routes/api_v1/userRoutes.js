// Packeage declare
const express = require('express');
const router = express.Router();


// Import Middleware
const { createUserSchema,loginUserSchema } = require('../../middleware/validators/userValidator.middleware');
const auth = require('../../middleware/auth.middleware');

// Import Controlerr
const UserController = require('../../controller/user.controller');
const awaitHandlerFactory = require('../../middleware/awaitHandlerFactory.middleware');


router.get('/login',auth('Admin'),UserController.login);

router.post('/login',loginUserSchema,awaitHandlerFactory(UserController.auth));

router.get('/signup',UserController.signup);

router.post('/signup',createUserSchema,awaitHandlerFactory(UserController.create));

router.delete('/delete/:id',awaitHandlerFactory(UserController.delete));

module.exports = router;