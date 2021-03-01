const express = require('express');
const router = express.Router();
const WaifuController = require('../../controller/waifu.controller');
const awaitHandlerFactory = require('../../middleware/awaitHandlerFactory.middleware');
const {
    waifuFilterSchema
} = require('../../middleware/validators/waifuValidator.middleware');

router.get('/',awaitHandlerFactory(WaifuController.showAll));

router.get('/tag/:tagType/:tagValue', awaitHandlerFactory(WaifuController.showTags));

router.get("/hair-length/:lengthType",awaitHandlerFactory(WaifuController.showHairLen));

router.post('/filter',awaitHandlerFactory(WaifuController.showFilter));

router.get('/:id', awaitHandlerFactory(WaifuController.showDetail));



module.exports = router;