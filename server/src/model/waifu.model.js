// Utils
const query = require('../db/conn');
const {
    multipleColumnSet
} = require('../utils/common.utils');

// Base Model Class
const BaseModel = require('./Model');

class WaifuModel extends BaseModel {

    constructor() {
        const tableName = 'waifus';
        super(tableName);
        this.selectSQL = `SELECT waifus.*, 
                                total_rating / count_rating AS ratings, 
                                date_times.time AS date_time, 
                                hair_types.name_type AS hair_type,
                                hobby_1.name AS hobby,
                                hobby_2.name AS hobby_2
                                FROM waifus 
                                LEFT JOIN hair_types ON hair_types.hair_type_id  = waifus.hair_type
                                LEFT JOIN date_times ON date_times.date_time_id = waifus.date_time
                                LEFT JOIN hobby hobby_1 ON hobby_1.hobby_id = waifus.hobby
                                LEFT JOIN hobby hobby_2 ON hobby_2.hobby_id = waifus.hobby_2`;
        this.lastQuery = {
            sql : "",
            params : [],
        };
    }


    async filter(allFilter) {
        const {
            name,
            age,
            price,
            ...filter
        } = allFilter;
        let sql = `${this.selectSQL} WHERE`;
        const params = [];

        // SET Query Filter

        if (name !== null) {
            sql += ` waifus.name LIKE "%${name}%" AND `;
        }

        // Filter select 
        if (Object.keys(filter).length) {
            const {
                columnSet,
                valuesFilter
            } = multipleColumnSet(filter, 'AND');
            //  add separator AND if columnset exist and values params
            columnSet ? sql += ` ${columnSet} AND` : null;
            valuesFilter ? params.push(...valuesFilter) : null;
        }

        // Age
        if (Object.keys(age).length) {
            const {
                columnSet,
                values
            } = this.queryRange('age', age);
            sql += `${columnSet} AND`;
            params.push(...values);
        }

        //  Price
        if (Object.keys(price).length) {
            const {
                columnSet,
                values
            } = this.queryRange('price', price);
            sql += columnSet;
            params.push(...values);
        }

        const result = await query(sql, params);
        this.setLastQuery(sql,params);
        return result;
    }


    async find(params = {}) {
        let sql = this.selectSQL;
        if (!Object.keys(params).length) {
            this.setLastQuery(sql);
            return await query(sql);
        }

        const {
            columnSet,
            values
        } = multipleColumnSet(params);
        sql += ` WHERE ${columnSet}`;
        const result = await query(sql, [...values]);
        this.setLastQuery(sql,[...values]);
        return result;
    }

    async findById(id) {
        const idColName = Object.keys(id)[0];
        const idColVal = Object.values(id)[0];
        const sql = `${this.selectSQL}  
                     WHERE ${idColName} = ?`;
        const result = await query(sql, [idColVal]);
        this.setLastQuery(sql,[idColVal]);
        return result[0];
    }


    async findOne(params = {}) {
        let sql = `SELECT *,total_rating / count_rating AS ratings  FROM waifus 
                   LEFT JOIN hair_types ON hair_types.hair_type_id = waifus.hair_type_id `;
        if (Object.keys(params).length) {
            const result = await query(sql);
            return result[0];
        }
        const {
            columnSet,
            values
        } = multipleColumnSet(params);
        sql += ` WHERE ${columnSet}`;
        const result = await query(sql, [...values]);
        this.setLastQuery(sql,[...values]);
        return result[0];
    }

    async findTopRating(limit) {
        let sql = `${this.selectSQL} ORDER BY ratings DESC`;
        if (limit) {
            sql += ` LIMIT ?`
            const result = await query(sql, [limit]);
            return result;
        }
        const result = await query(sql);
        this.setLastQuery(sql,params);
        return result;
    }

    async findByHobby(hobbyID) {
        const sql = `${this.selectSQL} WHERE hobby = ? OR hobby_2  = ?`;
        const result = await query(sql,[hobbyID,hobbyID]);
        return result;
    }

    async findByHairLength(lengthType) {
        let sql = this.selectSQL;
        sql += ` WHERE hair_types.hair_length = ?`;
        const result = await query(sql,[lengthType]);
        return result;
    }


    async setLastQuery(sql,params = []) {
        return this.lastQuery = {
            sql,
            params,
        }
    }


    getLastQuery() {
        return this.lastQuery;
    }


    async create({
        name,
        price,
        age,
        hair_type = 0,
        date_time = 0,
        hobby,
        hobby_2,
        description
    }) {
        const sql = `INSERT INTO ${this.tableName}
                    (name,price,age,hair_type,date_time,hobby,hobby_2,description) 
                     VALUES(?,?,?,?,?,?,?,?)`;
        const result = await query(sql, [name, price, age, hair_type, date_time, hobby, hobby_2, description]);
        const affectedRows = result.affectedRows;
        return affectedRows;
    }

    async incRating({
        rating
    }, id) {
        const waifu_id = parseInt(id);
        const sql = `UPDATE ${this.tableName} SET total_rating = total_rating + ?, 
                     count_rating = count_rating + 1 WHERE waifu_id = ?`;
        const result = await query(sql, [rating, waifu_id]);
        const affectedRows = result.affectedRows;
        return affectedRows;
    }

}

module.exports = new WaifuModel;