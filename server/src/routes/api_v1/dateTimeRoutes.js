const express = require('express');
const router = express.Router();

// Middleware function
const DateTimeController = require('../../controller/dateTime.controller');
const awaitHandlerFactory = require('../../middleware/awaitHandlerFactory.middleware');


router.get('/',awaitHandlerFactory(DateTimeController.all));

router.get('/:id',awaitHandlerFactory(DateTimeController.detail));

router.post('/',awaitHandlerFactory(DateTimeController.create));

router.delete('/:id',awaitHandlerFactory(DateTimeController.delete));

router.patch('/:id',awaitHandlerFactory(DateTimeController.update));


module.exports = router;