// Import all package
const express = require('express');
const router = express.Router();

// All middleware function
const awaitHandlerFactory = require('../../middleware/awaitHandlerFactory.middleware');
const auth = require('../../middleware/auth.middleware');

// Import controller
const HairTypeController = require('../../controller/hairType.controller');

router.get('/',awaitHandlerFactory(HairTypeController.all));

router.get('/:id',awaitHandlerFactory(HairTypeController.detail));

router.post('/',awaitHandlerFactory(HairTypeController.create));

router.delete('/:id',awaitHandlerFactory(HairTypeController.delete));

router.patch('/:id',awaitHandlerFactory(HairTypeController.update));


module.exports = router;