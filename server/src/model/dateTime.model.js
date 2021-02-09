// Utils
const query = require('../db/conn');
const { multipleColumnSet } = require('../utils/common.utils')
//  BaseModel
const BaseModel = require('../model/Model');

class DateTimeModel extends BaseModel {

    constructor() {
        const tableName = 'date_times';
        super(tableName);
    }


    // async find(params = {}) {
    //     let sql = `SELECT * FROM ${this.tableName}`;
    //     if(!Object.keys(params).length) {
    //         console.log('awdwadwa');
    //         return await query(sql);
    //     }
    //     const { columnSet,values } =  multipleColumnSet(params);
    //     sql += ` WHERE ${columnSet}`;
    //     return await query(sql,[...values]);
    // }

    // async findOne(params = {}) {
    //     let sql = `SELECT * FROM ${this.tableName}`;
    //     if(!Object.keys(params).length) {
    //         const result = await query(sql);
    //         return result[0];
    //     }
    //     const { columnSet,values } = multipleColumnSet(params);
    //     sql += ` WHERE ${columnSet}`;
    //     const result = await query(sql,[...values]);
    //     return result[0];
    // }

    async create({ name_time  }) {
        let sql = `INSERT INTO ${this.tableName} (name) VALUES(?)`;
        const result = await query(sql,[name_time]);
        const affectedRows = result.affectedRows;
        return affectedRows;
    }

    // async delete(id) {
    //     let sql = `DELETE FROM ${this.tableName} WHERE date_time_id = ?`;
    //     const result = await query(sql,[id]);
    //     const affectedRows = result.affectedRows;
    //     return affectedRows;
    // }

    // async update(params,id) {
    //     const { columnSet,values } = multipleColumnSet(params);
    //     const sql = `UPDATE ${this.tableName} SET ${columnSet} WHERE date_time_id = ?`;
    //     const result = await query(sql,[...values,id]);
    //     const affectedRows = result.affectedRows;
    //     return affectedRows;
    // }


}

module.exports = new DateTimeModel;