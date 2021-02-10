// Router
const express = require('express');
const router = express.Router();

// Package

// Controller
const HobbyController = require('../../controller/hobby.controller');

// Middleware
const awaitHandlerFactory = require('../../middleware/awaitHandlerFactory.middleware');

router.get('/',awaitHandlerFactory(HobbyController.all));

router.get('/:id',awaitHandlerFactory(HobbyController.detail));

router.post('/',awaitHandlerFactory(HobbyController.create));

router.patch('/:id',awaitHandlerFactory(HobbyController.update));

router.delete('/:id',awaitHandlerFactory(HobbyController.delete));

module.exports = router;


