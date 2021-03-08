const express = require("express");
const router = express.Router();

const ProfileController = require("../../controller/profile.controller");
const awaitHandlerFactory =  require("../../middleware/awaitHandlerFactory.middleware");


router.get("/",awaitHandlerFactory(ProfileController.main));

router.get("/reset-password",awaitHandlerFactory(ProfileController.resetPassword));


module.exports = router;