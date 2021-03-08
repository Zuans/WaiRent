// Utils
const query = require('../db/conn');
const jwt = require("jsonwebtoken");
// env variable
require("dotenv").config();
const { multipleColumnSet } = require('../utils/common.utils');
// Base Model Class
const BaseModel = require('../model/Model');


class UserModel extends BaseModel {

    constructor() {
        const tableName = 'users';
        super(tableName);
    }

    async create({username,email,role,password,favTag}) {
        let valCol = [username,email,role,password];
        if(!favTag.length) {
            const sql = `INSERT INTO ${this.tableName} (username,email,role,password) VALUES (?,?,?,?)`;
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
        const sql = `INSERT INTO ${this.tableName} (username,email,role,password,${tagCol}) VALUES (?,?,?,?,${tagQmark})`;
        console.log(sql);
        valCol = valCol.concat(tagVal);
        console.log(valCol);
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

}


module.exports = new UserModel();