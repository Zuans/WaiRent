const express = require('express');
const router = express.Router();


router.get('/detail',(req,res) => {
    res.render('routes/waifu-detail',{
        title : 'Waifu Detail'
    });
});

router.get('/all',(req,res) => {
    res.render('routes/waifu-all',{
        title : 'All Waifu'
    });
})


module.exports = router;