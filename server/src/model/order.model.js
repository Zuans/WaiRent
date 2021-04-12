const query  = require("../db/conn");
const BaseModel = require("./Model");


class CartModel extends BaseModel {

    constructor() {
        const tableName = 'orders';
        super(tableName);
    }

    async create(cart) {
        const sql = `INSERT INTO ${this.tableName} (user_id,waifu_id,order_date,duration,price) VALUES(?,?,?,?,?) `; 
        const result = await query(sql,[
            cart["user_id"],
            cart["waifu_id"],
            cart["date_time"],
            cart["duration_hours"],
            cart["total_price"],
        ]);
        const affectedRows  = result.affectedRows;
        return affectedRows;
    }

}



module.exports = new CartModel;