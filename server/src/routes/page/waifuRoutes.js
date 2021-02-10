const express = require('express');
const router = express.Router();
const waifuController = require('../../controller/waifu.controller');
const awaitHandlerFactory = require('../../middleware/awaitHandlerFactory.middleware');

router.get('/',awaitHandlerFactory(waifuController.showAll));

router.get('/:id',awaitHandlerFactory(waifuController.showDetail));



module.exports = router;