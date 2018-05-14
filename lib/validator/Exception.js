const Exception = require('../Exception');
/**
 * validator exception and export class
 */
module.exports = class ValidatorException extends Exception {
    /**
     * 
     * @param {String} message 
     * @param {code} code 
     * @api public
     */
    constructor(message, code) {
        super(message, code);
    }
}
