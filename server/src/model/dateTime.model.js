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

    async create({ name_time  }) {
        let sql = `INSERT INTO ${this.tableName} (name) VALUES(?)`;
        const result = await query(sql,[name_time]);
        const affectedRows = result.affectedRows;
        return affectedRows;
    }

    async findByTimeOrID(value) {
        const sql = `SELECT * FROM ${this.tableName} WHERE time = ? OR date_time_id = ?`;
        const result = await query(sql,[value,value]);
        return result[0];
    }



}

module.exports = new DateTimeModel;