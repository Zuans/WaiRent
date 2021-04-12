const cartModel =  require("../model/cart.model");
const orderModel = require("../model/order.model");
const HttpException = require('../utils/HttpExeception.utils');
const { sendResponses } = require("../utils/common.utils");
class OrderController {


    async create(req,res) {
        const { orders } = req.body;
        // Make create orders function
        orders.forEach( async (order) => { 
            const cartId = order.cartId;
            const cartRow = await cartModel.findById(cartId);
            const created = await orderModel.create(cartRow);
            if(!created) throw new HttpException(500);
            return sendResponses(res,null,"Order has created");
        })
    }
}



module.exports = new OrderController;