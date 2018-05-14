const Exception = require('../Exception');
/**
 * view exception and export class
 */
module.exports = class ViewException extends Exception {
    constructor(message, code) {
        super(message, code);
    }
}
