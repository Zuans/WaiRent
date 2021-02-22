const express = require('express');
const router = express.Router();
const waifuController = require('../../controller/waifu.controller');
const awaitHandlerFactory = require('../../middleware/awaitHandlerFactory.middleware');
const {
    waifuFilterSchema
} = require('../../middleware/validators/waifuValidator.middleware');

router.get('/', awaitHandlerFactory(waifuController.showAll));

router.get('/:tagType/:tagValue', awaitHandlerFactory(waifuController.showTags));

router.get('/sort',awaitHandlerFactory(waifuController.sortBy));

router.post('/', awaitHandlerFactory(waifuController.showAll));

router.get('/:id', awaitHandlerFactory(waifuController.showDetail));



module.exports = router;