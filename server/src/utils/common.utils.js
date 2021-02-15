const bcrypt = require('bcrypt');
const { validationResult } = require('express-validator');
const HttpException = require('./HttpExeception.utils');

const multipleColumnSet = (object,separator = ',') => {
    if(typeof object !== 'object' ) {
        throw new Error('Invalid input type');
    }

    const keys = Object.keys(object);
    const values = Object.values(object);

    const columnSet = keys.filter( k => object[k] !== null  ).map( key => ` ${key} = ? `).join(separator);

    const valuesFilter = values.filter( values => values !== null );

    return {
        columnSet,
        values,
        valuesFilter,
    }
}

const createHashPassword = async (values) => {
    const genSalt = 10;
    const resultHash = await bcrypt.hash(values,genSalt);
    return resultHash;
}

const checkValidation = (req) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        throw new HttpException(401,errors);
    }
    return true;
}

const sendResponses = (res, data = null, msg = '', statusCode = 200, statusMsg = 'success' ) => {
    return res.status(statusCode).send({
        status : statusMsg,
        data,
        msg : msg
    });
}

const sendResponsesEmpty = (res) => {
    return res.status(200).send({
        status : 'success',
        data : null,
        msg : 'no data avaible',
    });
}


module.exports = {
    multipleColumnSet,
    createHashPassword,
    checkValidation,
    sendResponses,
    sendResponsesEmpty,
}