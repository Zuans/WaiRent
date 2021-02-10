// Utils
const query = require('../db/conn');
const { multipleColumnSet } = require('../utils/common.utils');

// Base Model Class
const BaseModel = require('../model/Model');

class WaifuModel extends BaseModel {

    constructor() {
        const tableName = 'waifus';
        super(tableName);
    }

    async find(params = {}) {
        let sql = `SELECT waifus.*, FLOOR(total_rating / count_rating) AS ratings FROM waifus;`
        if(!Object.keys(params).length) {
            return await query(sql);
        }

        const { columnSet,values } = multipleColumnSet(params);
        sql += ` WHERE ${columnSet}`;
        const result = await query(sql,[...values]);
        return result;
    }


    async findOne(params = {}) {
        let sql = `SELECT waifus.*, FLOOR(total_rating / count_rating) AS ratings FROM waifus`;
        if(Object.keys(params).length) {
            const result = await query(sql);
            return result[0];
        }
        const {columnSet,values} = multipleColumnSet(params);
        sql += ` WHERE ${columnSet}`;
        const result = await query(sql,[...values]);
        return result[0];
    }


    async create({
        name,
        price,
        age,
        hair_type = 0,
        date_time= 0,
        hobby,
        hobby_2,
        description
    }) {
        const sql = `INSERT INTO ${this.tableName}(name,price,age,hair_type,date_time,hobby,hobby_2,description) VALUES(?,?,?,?,?,?,?,?)`;
        const result = await query(sql,[name,price,age,hair_type,date_time,hobby,hobby_2,description]);
        const affectedRows = result.affectedRows;
        return affectedRows;
    }

    async incRating({rating},id) {
        const waifu_id = parseInt(id);
        const sql = `UPDATE ${this.tableName} SET total_rating = total_rating + ?, count_rating = count_rating + 1 WHERE waifu_id = ?`;
        console.log(sql);
        const result = await query(sql,[rating,waifu_id]);
        const affectedRows = result.affectedRows;
        return affectedRows;
    }

}

module.exports = new WaifuModel;