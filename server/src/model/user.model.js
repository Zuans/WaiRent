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

    // async find(params = {} ) {
    //     let sql = `SELECT * FROM ${this.tableName}`;
    //     if(!Object.keys(params).length) {
    //         return await query(sql);
    //     }

    //     const { columnSet, values} = multipleColumnSet();
    //     console.log(columnSet,values);
    //     sql+=` WHERE ${columnSet}`;
    //     return await query(sql,[...values]);
    // }

    // async findOne(params = {}) {
    //     let sql = `SELECT * FROM ${this.tableName}`;
    //     if(!Object.keys(params).length) {
    //         const result = await query(sql);
    //         return result[0];
    //     }

    //     const { columnSet,values} = multipleColumnSet(params);
    //     sql += ` WHERE ${columnSet}`;
    //     const result = await query(sql,[...values]);
    //     return result[0];
    // }

    async create({username,email,role,password}) {
        const sql = `INSERT INTO ${this.tableName} (username,email,role,password) VALUES (?,?,?,?)`;
        const result = await query(sql,[username,email,role,password]);
        const affectedRows = result ? result.affectedRows : 0;
        return affectedRows;
    }

    // async update(params,id) {
    //     const {columnSet,values } = multipleColumnSet(params);
    //     const sql = `UPDATE ${this.tableName} SET ${columnSet} WHERE id = ?`;
    //     return await query(sql,[...values,id]);
    // }

    // async delete(id) {
    //     const sql = `DELETE FROM ${this.tableName} WHERE id = ?`;
    //     const result = await query(sql,[id]);
    //     const affectedRows = result ? result.affectedRows : 0;
    //     return affectedRows;
    // }

}


module.exports = new UserModel();