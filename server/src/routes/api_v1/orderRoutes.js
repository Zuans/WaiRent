const express = require("express");
const router = express.Router();

const awaitHandlerFactory = require("../../middleware/awaitHandlerFactory.middleware");
const OrderController = require("../../controller/order.controller");


router.post("/",awaitHandlerFactory(OrderController.create));

router.post("/single/:id/duration")


module.exports=  router;