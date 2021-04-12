// Import utils,model etc
const userModel = require("../model/user.model");
const waifuModel = require("../model/waifu.model");
const cartModel = require("../model/cart.model");
const { sendResponses, sendResponsesEmpty, checkValidation } = require("../utils/common.utils");
const HttpException = require("../utils/HttpExeception.utils");
const { allDay,allMonth,setHours } = require("../utils/date.utils");

class CartController {


// Cart CRUD 

    async index(req,res) {
        const allCart = await cartModel.find();
        return sendResponses(res,allCart,"success get all cart");
    }

    async getByUser(req,res) {

        const  {id : userId } = req.currentUser;
        const allCart = await cartModel.getByUserId(userId);
    
        if(!allCart.length) return sendResponsesEmpty(res);

        return sendResponses(res,allCart,`Success, get all cart from user id ${userId}`);
    }


    async getWaifuPrice(req,res) {
        const { cartId } = req.params;

        const cartRow = await cartModel.findById(cartId);
        return sendResponses(res,{
            waifuPrice : cartRow["waifu_price"]
        });
    }

    async changeDuration(req,res) {
        const id = parseInt(req.params["id"]);
        const duration = parseInt(req.params["duration"]);
        const cart = await cartModel.findById(id);
        const waifu = await waifuModel.findById({ waifu_id : cart["waifu_id"] });
        // if user change we must change the total price to
        const totalPrice = waifu["price"] * duration;
        const updated = await cartModel.changeDuration(id,duration,totalPrice);
        if(!updated) throw new HttpException(500);

        return sendResponses(res,{
            totalPrice,  
        },"Duration has change");
    }

    async create(req,res) {
        checkValidation(req);
        // All body.params
        // **  waifuId
        // **  duration 
        // **  dateTime

        const { price : waifuPrice } = await waifuModel.findById({ waifu_id : req.body.waifuId });
        // Add total_price
        req.body.totalPrice = req.body.duration * waifuPrice;
        const { id : userId } = req.currentUser;

        const created = await cartModel.create({userId,...req.body});
        if(!created) throw new HttpException(500);
        
        return sendResponses(res,null,"order cart has been created");
    }




    async update(req,res) {
        checkValidation(req);
        // All body.params
        // **  waifuId
        // **  duration
        // **  dateTime 
        
        // Get current user
        const  { role : userRole, id : userId } = req.currentUser;
        const { id } = req.params;
        // get totalPrice
        const { price : waifuPrice } = await waifuModel.findById({ waifu_id : req.body.waifuId });
        // Add total_price
        req.body.totalPrice = req.body.duration * waifuPrice;
        const updated = await cartModel.updateById({userRole,userId,id,...req.body});
        if(!updated) throw new HttpException(500);

        return sendResponses(res,null,`Success updated cart with id ${id}`)

    }

    async updateTime(req,res) {
        checkValidation(req);

        const { id } = req.params;
        const  { time } = req.body;
        const unixTime = parseInt(time);
        const updated = await cartModel.updateTimeById(unixTime,id);
        if(!updated) throw new HttpException(500);

        return sendResponses(res,null,"Date time has updated!")
    }




    async deleteAllByUser(req,res) {

        const { id: userId } = req.currentUser;
        const deleted =  await cartModel.deleteByUserId(userId);
        if(!deleted) throw new HttpException(500);

        return sendResponses(res,null,`all order from user id ${userId} has deleted`);
    }


    async deleteByCartId(req,res) {

        const { role : userRole, id : userId } = req.currentUser;
        const { cartId } = req.params;
        const deleted = await cartModel.deleteByCartId(cartId,userId,userRole);
        if(!deleted) throw new HttpException(500);
        
        return sendResponses(res,null,`Delete cart with id ${cartId} success`);
    }
    

    async getDateTime(req,res) {
        const { id } = req.params;
        if(!id) throw new Error("Id is undefined");
        const { date_time : dateTime } = await cartModel.findById(id);
        const date =  new Date(dateTime);
        const fullDate = {
            fulldate : date,
            year :  date.getFullYear(),
            monthIndex : date.getMonth(),
            monthStr : allMonth[date.getMonth()],
            date : date.getDate(),
            hour : date.getHours(),
            minute : date.getMinutes(),
        }

        return sendResponses(res,fullDate);
    }



    async main(req,res) {
        const token =  req.cookies.token || null;
        const user = token ? await userModel.findByJWT(token) : null;
        const carts = await cartModel.getByUserId(user.id);
        carts.forEach((cart,index) => {
            const dates = new Date(cart["date_time"]);
            const date = dates.getDate();
            const day = allDay[dates.getDay()];
            const month = allMonth[dates.getMonth()];
            const year = dates.getFullYear();
            const fullDate = `${day} ${date} ${month} ${year}`;
            carts[index]["fullDate"] = fullDate;
            // Set hours
            const {
                hour,
                timePart
            } = setHours(dates.getHours());
            const minutes = dates.getMinutes();
            carts[index]["timeStr"] = `${hour} : ${minutes} ${timePart}`;
        });
        res.render("routes/cart/main",{
            title : "Cart",
            carts,
            user,
        });
    }
}


module.exports = new CartController;