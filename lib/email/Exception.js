const Exception = require('../Exception');
/**
 * mail exception and export class
 */
module.exports = class MailException extends Exception {
    /**
     * 
     * @param {String} message 
     * @param {Number} code 
     * @param {Object} options 
     */
    constructor(message, code, options) {
        super(message, code);
        this.options = options;
    }
}
