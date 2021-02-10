const express = require('express');
const router = express.Router();

router.get('/',(req,res) => {
    res.send('awdwad');
})

router.get('/test',(req,res) => {
    res.send('awdawdawd');
}) 


module.exports = router;