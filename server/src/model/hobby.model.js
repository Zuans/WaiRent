// query DB
const query = require('../db/conn');

// BaseModel 
const BaseModel = require('./Model');


class HobbyModel extends BaseModel {

    constructor() {
        const tableName = 'hobby';
        super(tableName);
    }

    async create({name}) {
        const sql = `INSERT INTO ${this.tableName} (name) VALUES(?)`;
        const result = await query(sql,[name]);
        const affectedRows = result.affectedRows;
        return affectedRows;
    }

    async findByNameOrID(value) {
        const sql = `SELECT * FROM ${this.tableName} WHERE name = ? OR hobby_id = ?`;
        const result = await query(sql,[value,value]);
        return result[0];
    }

}


module.exports = new HobbyModel;