const Exception = require('../Exception');
/**
 * htpp exception and export class
 */
module.exports = class HttpException extends Exception{
    constructor(message, code) {
        super(message, code);
    }
}
