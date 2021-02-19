const query = require('../db/conn');
const { multipleColumnSet } = require('../utils/common.utils');
// Extends Base Model
const BaseModel = require('../model/Model');



class HairTypeModel extends BaseModel {


    constructor() {
        const tableName = 'hair_types';
        super(tableName);
    }

    async create({name_type}) {
        const sql = `INSERT INTO ${this.tableName} (name_type) VALUES(?)`;
        const result = await query(sql,[name_type]);
        const affectedRows = result.affectedRows;
        return affectedRows;
    }

    async findByNameOrID(value) {
        const sql = `SELECT * FROM ${this.tableName} WHERE name_type = ? OR hair_type_id =  ?`;
        const result = await query(sql,[value,value]);
        return result[0];
    }


}


module.exports = new HairTypeModel;