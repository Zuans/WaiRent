const express = require("express");
const router = express.Router();
const { createCartSchema, updateCartSchema} = require("../../middleware/validators/cartValidator")
const  awaitHandlerFactory = require("../../middleware/awaitHandlerFactory.middleware");
const CartController = require("../../controller/cart.controller");
const auth = require("../../middleware/auth.middleware");

router.get('/',auth("admin"),awaitHandlerFactory(CartController.index));

router.get('/user',auth("user","admin"),awaitHandlerFactory(CartController.getByUser));

router.get('/:cartId/waifu-price',awaitHandlerFactory(CartController.getWaifuPrice));

router.post('/',createCartSchema,auth("user","admin"),awaitHandlerFactory(CartController.create));

router.patch('/:id',updateCartSchema,auth("user","admin"),awaitHandlerFactory(CartController.update));

router.delete('/',auth("user","admin"),awaitHandlerFactory(CartController.deleteAllByUser));

router.delete('/:cartId',auth("user","admin"),awaitHandlerFactory(CartController.deleteByCartId));

module.exports = router;