const express = require("express");
const router = express.Router();

const CartController = require("../../controller/cart.controller");
const awaitHandlerFactory = require("../../middleware/awaitHandlerFactory.middleware");



router.get("/",awaitHandlerFactory(CartController.main));


module.exports = router;