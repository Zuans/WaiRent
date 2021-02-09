const query = require('../db/conn');
const { multipleColumnSet } = require('../utils/common.utils');

class WaifuModel {

    constructor() {
        this.tableName = 'waifus';
    }

    async find( params = {} ) {
        let sql = `SELECT * FROM ${this.tableName}`;
        if(!Object.keys(params).length) {
            return await query(sql);
        }
        const { columnSet,values } = multipleColumnSet(params);
        sql += ` WHERE ${columnSet}`;
        const result = await query(sql,[...values]);
        return result;
    }

    async findOne(params = {}) {
        let sql = `SELECT * FROM ${this.tableName}`;
        if(!Object.keys(params).length) {
            const result = await query(sql);
            return result[0];
        }

        const { columnSet,values } = multipleColumnSet(params);
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

    async update(params,id) {
        const { columnSet,values } = multipleColumnSet(params);
        const sql = `UPDATE ${this.tableName} SET ${columnSet} WHERE id = ?`;
        const result = await query(sql,[...values,id]);
        const affectedRows =  result.affectedRows;
        return affectedRows;
    }

    async delete(id) {
        const sql = `DELETE FROM ${this.tableName} WHERE id = ?`;
        const result = await query(sql,[id]);
        const affectedRows = result.affectedRows;
        return affectedRows;
    }
}

module.exports = new WaifuModel;