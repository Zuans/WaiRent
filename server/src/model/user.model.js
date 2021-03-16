// Utils
const query = require('../db/conn');
const jwt = require("jsonwebtoken");
// env variable
require("dotenv").config();
const { multipleColumnSet } = require('../utils/common.utils');
// Base Model Class
const BaseModel = require('../model/Model');
const HttpException = require('../utils/HttpExeception.utils');


class UserModel extends BaseModel {

    constructor() {
        const tableName = 'users';
        super(tableName);
    }

    async create({username,email,role,password,age,favTag}) {
        let valCol = [username,email,role,password,age];
        if(!favTag.length) {
            const sql = `INSERT INTO ${this.tableName} (username,email,role,password,age) VALUES (?,?,?,?,?)`;
            const result = await query(sql,[username,email,role,password]);
            const affectedRows = result ? result.affectedRows : 0;
            return affectedRows;
        }
        // for fav_tag column
        const tagCol = favTag.map( (col,index) => `fav_tag_${index+1}`).join(",");
        // to make question mark on sql query as many  as tag count
        const tagQmark = favTag.map( tag => "?").join(",");
        // tagValue tu insert in database then concat with valCol variable
        const tagVal = favTag.map( tag => tag.value);
        // insert to database
        const sql = `INSERT INTO ${this.tableName} (username,email,role,password,age,${tagCol}) VALUES (?,?,?,?,?,${tagQmark})`;
        valCol = valCol.concat(tagVal);
        const result = await query(sql,valCol);
        const affectedRows = result ? result.affectedRows : 0;
        return affectedRows;
    }

    async findByJWT(token) {
        try {
            const JWTSecret = process.env.JWT_SECRET;
            const decoded = jwt.verify(token,JWTSecret);
            const user = await this.findOne({ id : decoded.user_id });
            const {password,...userWithoutPass} = user;
            return userWithoutPass;
        } catch(err) {
            console.log(err)
        }
    }

    async getFavTagById(userId) {
        const sql =  `SELECT fav_tag_1, fav_tag_2, fav_tag_3 FROM ${this.tableName} WHERE id = ?`;
        const resultRow = await query(sql,[userId]);
        const result = this.parsingRow(resultRow[0]);
        return result;
    }

    async changeFavTag(userId,allTag) {
        const sql = `UPDATE users SET fav_tag_1 =  ?, fav_tag_2 = ?, fav_tag_3 = ? WHERE id = ${userId}`;
        const values = [];
        const countTag = 3;
        for( let i = 0; i < countTag; i++ ) {
            const val = allTag[i] ? allTag[i].value : null;
            values.push(val);
        };
        console.log(values);
        const result = await query(sql,values);
        const affectedRows = result.affectedRows;   
        return affectedRows;
    }

    async changePassword(password,userId) {
        const sql = "UPDATE users SET password = ? WHERE id = ?";
        const result = await query(sql,[password,userId]);
        const affectedRows = result.affectedRows;
        return affectedRows;
    }


}


module.exports = new UserModel();