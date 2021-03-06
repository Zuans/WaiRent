const query = require('../db/conn');
const { multipleColumnSet } = require('../utils/common.utils');


class BaseModel {

    constructor(tableName,selectSQL = "") {
        this.tableName = tableName;
        this.selectSQL = selectSQL;
    }


    parsingRow(data) {
        return JSON.parse(JSON.stringify(data));
    }

    parsingRows(data) {
        const allData = [];
        data.map(d => {
            const parseRow = this.parsingRow(d);
            allData.push(...parseRow);
        });
        return allData;
    }

    async find(params ={}) {
        let sql = `SELECT * FROM ${this.tableName}`;
        if(!Object.keys(params).length) {
            return await query(sql);
        }

        const {columnSet,values} = multipleColumnSet(params);
        sql += ` WHERE ${columnSet}`;
        return await query(sql,[...values]);
    }

    async findOne(params = {}) {
        let sql = `SELECT * FROM ${this.tableName}`;
        if(!Object.keys(params).length) {
            const result = await query(sql);
            return result[0];
        }
        const { columnSet,values } = multipleColumnSet(params);
        sql += ` WHERE ${columnSet}`;
        const result =  await query(sql,[...values]);
        return result[0];
    }

    async findById(id) {
        const idColName = Object.keys(id)[0];
        const idColVal = Object.values(id)[0];
        const sql = `SELECT * FROM ${this.tableName} WHERE ${idColName} = ?`;
        const result = await query(sql,[idColVal]);
        return result[0];
    }

    async findBySQL(sql,params = []) {
        // validation params type
        if(!Array.isArray(params)) throw new Error('wrong type input');
        const result = await query(sql,params);
        return result;
    }

    // MAKE BASE METHOD ON MODEL CONTROLLER !;
    
    async updateById(params,id) {
        const idColName = Object.keys(id)[0];
        const idColVal = Object.values(id)[0];
        const { columnSet,values } = multipleColumnSet(params);
        const sql = `UPDATE ${this.tableName} SET ${columnSet} WHERE ${idColName} = ?`;
        const result = await query(sql,[...values,idColVal]);
        const affectedRows = result.affectedRows;
        return affectedRows;
    }


    async deleteById(id) {
        const idColName = Object.keys(id)[0];
        const idColVal = Object.values(id)[0];
        const sql = `DELETE FROM ${this.tableName} WHERE ${idColName} = ?`;
        const result = await query(sql,[idColVal]);
        console.log(result);
        const affectedRows = result.affectedRows;
        return affectedRows;
    }

    queryRange(columnName,paramsObj)  {
        const columnSet = ` ${columnName} IN( SELECT ${columnName} FROM ${this.tableName} WHERE ${columnName} >= ? AND ${columnName} <= ? )`;
        const values = [];
        if( typeof paramsObj === 'object' ) {
            Object.values(paramsObj).map( val => values.push(val));
        }  
        return {
            columnSet,
            values,
        }
    }

    queryOrderBy(orderObj = {}) {
        let columnOrder = "ORDER BY";
        if( typeof orderObj !== "object") throw new Error('wrong type input')
        const orderKey = Object.keys(orderObj);
        
        // Set column
        columnOrder += orderKey.map( key => ` ${key} ${orderObj[key]}`).join(',');
        return columnOrder;
    }
}

module.exports = BaseModel;