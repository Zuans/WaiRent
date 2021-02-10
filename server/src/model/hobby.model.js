// query DB
const query = require('../db/conn');

// BaseModel 
const BaseModel = require('../model/Model');


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

}


module.exports = new HobbyModel;