const waifuModel = require('../../model/waifu.model');



const index  = async (req,res) => {  
    const titlePage = 'Home';
    const topWaifu = await waifuModel.findTopRating(3);
    return res.render('index',{
        title : titlePage,
        topWaifu : topWaifu
    });
}


module.exports = index;