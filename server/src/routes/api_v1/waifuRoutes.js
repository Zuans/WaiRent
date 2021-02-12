const express = require('express');
const router = express.Router();

const WaifuController = require('../../controller/waifu.controller');
const awaitHandleFactory = require('../../middleware/awaitHandlerFactory.middleware');
const auth = require('../../middleware/auth.middleware');


router.get('/',WaifuController.all);

router.get('/:id',WaifuController.detail);

router.post('/',awaitHandleFactory(WaifuController.create));

router.post('/rating/:id',awaitHandleFactory(WaifuController.setRating));

router.delete('/:id',WaifuController.delete);

router.patch('/:id',WaifuController.update);

router.get('/rating/top',WaifuController.topRating);


module.exports = router;