const query =  require("../db/conn");
const { multipleColumnSet } = require("../utils/common.utils");
const BaseModel = require("./Model");


class CartModel extends BaseModel {

    constructor() {
        const tableName = "carts";
        const selectSQL = `SELECT 
                                carts.*,
                                waifus.name AS waifu_name,
                                waifus.price AS waifu_price,
                                waifus.age AS waifu_age, 
                                total_rating / count_rating AS waifu_ratings, 
                                date_times.time AS waifu_date_time, 
                                hair_types.name_type AS waifu_hair_type,
                                hobby_1.name AS waifu_hobby,
                                hobby_2.name AS waifu_hobby_2
                           FROM ${tableName} 
                           LEFT JOIN waifus ON waifus.waifu_id = ${tableName}.waifu_id
                           LEFT JOIN hair_types ON hair_types.hair_type_id  = waifus.hair_type
                           LEFT JOIN date_times ON date_times.date_time_id = waifus.date_time
                           LEFT JOIN hobby hobby_1 ON hobby_1.hobby_id = waifus.hobby
                           LEFT JOIN hobby hobby_2 ON hobby_2.hobby_id = waifus.hobby_2`;  
        super(tableName,selectSQL);
    }

    async getAll() {
        const result = await query(this.selectSQL);
        return result;
    }


    async findById(cartId) {
        const sql = `${this.selectSQL} WHERE id = ?`;
        const result = await query(sql,[cartId]);
        return result[0];
    }

    async getByUserId(userId) {
        const sql =  `${this.selectSQL}  WHERE user_id = ?`;
        const result = await query(sql,[userId]);
        return result;
    }

    async create({
        userId,
        waifuId,
        duration,
        startDate,
        endDate,
        totalPrice
    }) {
        const sql = `INSERT INTO ${this.tableName} (user_id,waifu_id,duration_hours,start_date,end_date,total_price) VALUES(?,?,?,FROM_UNIXTIME(?),FROM_UNIXTIME(?),?)`;
        const result = await query(sql,[userId,waifuId,duration,startDate,endDate,totalPrice]);
        const affectedRows = result.affectedRows;
        return affectedRows;
    }


    async updateById({
        userRole,
        userId,
        waifuId,
        duration,
        startDate,
        endDate,
        status,
        totalPrice,
        id
    }) {
        let sql = `UPDATE ${this.tableName} SET 
                        user_id = ?,
                        waifu_id = ?,
                        duration_hours = ?,
                        start_date =  FROM_UNIXTIME(?),
                        end_date =  FROM_UNIXTIME(?),
                        status = ?,
                        total_price = ?
                    WHERE id = ?`;
        if(userRole === "admin" ) {
            const result = await query(sql,[userId,waifuId,duration,startDate,endDate,status,totalPrice,id]);
            const affectedRows = result.affectedRows;
            return affectedRows;        
        }
        
        sql += ` AND user_id = ?`;
        const result = await query(sql,[userId,waifuId,duration,startDate,endDate,status,amount,id,userId]);
        const affectedRows = result.affectedRows;
        return affectedRows;        
    }


    async deleteByCartId(cartId,userId,userRole) {
        let sql =  `DELETE FROM ${this.tableName} WHERE id = ?`;
        if(userRole === "admin") {
            const result = await query(sql,[cartId]);
            const affectedRows =  result.affectedRows;
            return affectedRows;
        }
        sql += ` AND user_id = ?`;
        const result = await query(sql,[cartId,userId]);
        const affectedRows =  result.affectedRows;
        return affectedRows;
    }


    async deleteByUserId(userId) {
        let sql = `DELETE FROM ${this.tableName} WHERE user_id = ?`;
        const result = await query(sql,[userId]);
        const affectedRows =  result.affectedRows;
        return affectedRows;
    }

}


module.exports = new CartModel;