const dotenv = require('dotenv');
dotenv.config();
const mysql2 = require('mysql2');


class DBConnection {


    constructor() {
        this.db = mysql2.createPool({
            host : process.env.DB_HOST,
            user : process.env.DB_USERNAME,
            password : process.env.DB_PASSWORD,
            database : process.env.DB_NAME,
        });
        this.checkConnection();
    }

    checkConnection() {
        this.db.getConnection((err,connection) => {
            if(err) {
                if(err.code === 'PROTOCOL_CONNECTION_LOST') {
                    console.error('Database Connection was closed');
                }
                if(err.code === 'ER_CON_COUNT_ERROR') {
                    console.error('Database has too many connection');
                }
                if(err.code === 'ECONNREFUSED') {
                    console.error('Database connection was refused');
                }
            }   

            if(connection) {
                connection.release();
            }

            return;
        });

    }



    async query (query,values) {
        return new Promise((resolve,reject) => {
            const cb = (err,result) => {
                if(err) {
                    reject(err);
                    return
                }
                resolve(result);
            }
            this.db.execute(query,values,cb);
        }).catch(err  => {
            const mysqlErrList = Object.keys(httpStatusCode);
            err.status =  mysqlErrList.includes(err.code) ? httpStatusCode[err.code] : err.status;
            throw err;
        });
    }
}


const httpStatusCode = Object.freeze({
    ER_TRUNCATED_WRONG_VALUE_FOR_FIELD : 422,
    ER_DUP_ENTRY : 409,
})

const DBConnect = new DBConnection();



module.exports  = DBConnect.query.bind(DBConnect);