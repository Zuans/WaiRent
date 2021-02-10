// Utils
const query = require('../db/conn');
const { multipleColumnSet } = require('../utils/common.utils');
// Base Model Class
const BaseModel = require('../model/Model');


class UserModel extends BaseModel {

    constructor() {
        const tableName = 'users';
        super(tableName);
    }

    async create({username,email,role,password}) {
        const sql = `INSERT INTO ${this.tableName} (username,email,role,password) VALUES (?,?,?,?)`;
        const result = await query(sql,[username,email,role,password]);
        const affectedRows = result ? result.affectedRows : 0;
        return affectedRows;
    }

}


module.exports = new UserModel();