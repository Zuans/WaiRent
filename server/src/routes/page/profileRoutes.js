const express = require("express");
const router = express.Router();

const ProfileController = require("../../controller/profile.controller");
const awaitHandlerFactory =  require("../../middleware/awaitHandlerFactory.middleware");


router.get("/",awaitHandlerFactory(ProfileController.main));



module.exports = router;