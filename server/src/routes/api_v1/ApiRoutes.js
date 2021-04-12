const express = require('express');
const router = express.Router();

const cartRoutes = require("./cartRoutes");
const dateTimeRoutes= require('./dateTimeRoutes');
const hairTypeRoutes = require('./hairTypeRoutes');
const hobbyRoutes = require('./hobbyRoutes');
const userRoutes = require('./userRoutes');
const waifuRoutes = require('./waifuRoutes');
const orderRoutes = require('./orderRoutes')

router.use('/cart',cartRoutes);

router.use('/order',orderRoutes);

router.use('/date-time',dateTimeRoutes);

router.use('/hair-type',hairTypeRoutes);

router.use('/hobby',hobbyRoutes);

router.use('/user',userRoutes);

router.use('/waifu',waifuRoutes);



module.exports = router;