const express = require('express');
const router = express.Router();

const WaifuController = require('../../controller/waifu.controller');
const awaitHandlerFactory = require('../../middleware/awaitHandlerFactory.middleware');
const auth = require('../../middleware/auth.middleware');


router.get('/',WaifuController.all);

router.get('/sort',awaitHandlerFactory(WaifuController.sortBy));

router.get('/:id',WaifuController.detail);

router.get('/rating/top',WaifuController.topRating);

router.get('/tag/:tagType/:tagValue', awaitHandlerFactory(WaifuController.getByTags));

router.post('/',awaitHandlerFactory(WaifuController.create));

router.post('/filter',awaitHandlerFactory(WaifuController.filter));

router.post('/rating/:id',awaitHandlerFactory(WaifuController.setRating));

router.delete('/:id',WaifuController.delete);

router.patch('/:id',WaifuController.update);




module.exports = router;