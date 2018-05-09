const Exception = require('../Exception');

class HttpException extends Exception{
    constructor(message, code) {
        super(message, code);
    }
}

module.exports = HttpException;