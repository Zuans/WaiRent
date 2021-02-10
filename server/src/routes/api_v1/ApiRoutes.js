const express = require('express');
const router = express.Router();

const waifuRoute = require('./waifuRoutes');
const userRoute = require('./userRoutes');
const dateTimeRoute = require('./dateTimeRoutes');
const hairTypeRoute = require('./hairTypeRoutes');
const hobbyRoutes = require('./hobbyRoutes');


router.use('/waifu',waifuRoute);

router.use('/user',userRoute);

router.use('/date-time',dateTimeRoute);

router.use('/hair-type',hairTypeRoute);

router.use('/hobby',hobbyRoutes);

module.exports = router;