
class HttpException extends Error {
    constructor(status,message,data) {
        console.log(message);
        super(message);
        this.status = status;
        this.message = message;
        this.data = data;
    }
}

module.exports = HttpException;