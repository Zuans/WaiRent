const waifuModel = require('../../model/waifu.model');
const userModel = require("../../model/user.model");


const index  = async (req,res) => {  
    const titlePage = 'Home';
    const topWaifu = await waifuModel.findTopRating(3);
    const user = req.cookies.token ? await userModel.findByJWT(req.cookies.token) : null;
    return res.render('index',{
        title : titlePage,
        topWaifu : topWaifu,
        user,
    });
}


module.exports = index;