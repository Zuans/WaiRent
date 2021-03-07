function errorMiddleware(error,req,res,next) {
    let { 
        status = 500, 
        message, 
        data 
    } = error;
    

    console.log(`[Error] : ${error}`);

    message = status === 500 || !message ? 'Internal Server Error' : message;

    error = {
        type : 'error',
        message,
        status,
        ...(data) && data
    };

    res.status(status).send(error);
}

module.exports = errorMiddleware;
