// Utils
const query = require('../db/conn');
const { multipleColumnSet } = require('../utils/common.utils');

// Base Model Class
const BaseModel = require('../model/Model');

class WaifuModel extends BaseModel {

    constructor() {
        const tableName = 'waifus';
        super(tableName);
        this.selectSQL  = `SELECT waifus.*, 
                                total_rating / count_rating AS ratings, 
                                date_times.time AS date_time, 
                                hair_types.name_type AS hair_type,
                                hobby.name AS hobby,
                                hobby_2.name AS hobby_2
                                FROM waifus 
                                LEFT JOIN hair_types ON hair_types.hair_type_id  = waifus.hair_type
                                LEFT JOIN date_times ON date_times.date_time_id = waifus.date_time
                                LEFT JOIN hobby ON hobby.hobby_id = waifus.hobby
                                LEFT JOIN hobby hobby_2 ON hobby_2.hobby_id = waifus.hobby`;
    }

    async find(params = {}) {
        let sql = this.selectSQL;
        if(!Object.keys(params).length) {
            return await query(sql);
        }

        const { columnSet,values } = multipleColumnSet(params);
        sql += ` WHERE ${columnSet}`;
        const result = await query(sql,[...values]);
        return result;
    }

    async findById(id) {
        const idColName = Object.keys(id)[0];
        const idColVal = Object.values(id)[0];
        const sql = `${this.selectSQL}  
                     WHERE ${idColName} = ?`;
        const result = await query(sql,[idColVal]);
        return result[0];
    }


    async findOne(params = {}) {
        let sql = `SELECT *,total_rating / count_rating AS ratings  FROM waifus 
                   LEFT JOIN hair_types ON hair_types.hair_type_id = waifus.hair_type_id `;
        if(Object.keys(params).length) {
            const result = await query(sql);
            return result[0];
        }
        const {columnSet,values} = multipleColumnSet(params);
        sql += ` WHERE ${columnSet}`;
        const result = await query(sql,[...values]);
        return result[0];
    }

    async findTopRating(limit) {
        let sql = `${this.selectSQL} ORDER BY ratings DESC`;
        if(limit) {
            sql += ` LIMIT ?`
            const result = await query(sql,[limit]);
            return result;
        }
        const result = await query(sql);
        return result;
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
        const sql = `INSERT INTO ${this.tableName}
                    (name,price,age,hair_type,date_time,hobby,hobby_2,description) 
                     VALUES(?,?,?,?,?,?,?,?)`;
        const result = await query(sql,[name,price,age,hair_type,date_time,hobby,hobby_2,description]);
        const affectedRows = result.affectedRows;
        return affectedRows;
    }

    async incRating({rating},id) {
        const waifu_id = parseInt(id);
        const sql = `UPDATE ${this.tableName} SET total_rating = total_rating + ?, 
                     count_rating = count_rating + 1 WHERE waifu_id = ?`;
        console.log(sql);
        const result = await query(sql,[rating,waifu_id]);
        const affectedRows = result.affectedRows;
        return affectedRows;
    }

}

module.exports = new WaifuModel;