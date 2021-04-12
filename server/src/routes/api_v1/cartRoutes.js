const express = require("express");
const router = express.Router();
const { createCartSchema, updateCartSchema, updateTimeSchema} = require("../../middleware/validators/cartValidator")
const  awaitHandlerFactory = require("../../middleware/awaitHandlerFactory.middleware");
const CartController = require("../../controller/cart.controller");
const auth = require("../../middleware/auth.middleware");

router.get('/',auth("admin"),awaitHandlerFactory(CartController.index));

router.get('/user',auth("user","admin"),awaitHandlerFactory(CartController.getByUser));

router.get('/:cartId/waifu-price',awaitHandlerFactory(CartController.getWaifuPrice));

router.get('/date-time/:id',awaitHandlerFactory(CartController.getDateTime));

router.post('/date-time/:id',updateTimeSchema,awaitHandlerFactory(CartController.updateTime));

router.post('/',createCartSchema,auth("user","admin"),awaitHandlerFactory(CartController.create));

router.patch('/:id',updateCartSchema,auth("user","admin"),awaitHandlerFactory(CartController.update));

router.patch('/duration/:id/:duration',awaitHandlerFactory(CartController.changeDuration));

router.delete('/',auth("user","admin"),awaitHandlerFactory(CartController.deleteAllByUser));

router.delete('/:cartId',auth("user","admin"),awaitHandlerFactory(CartController.deleteByCartId));

module.exports = router;