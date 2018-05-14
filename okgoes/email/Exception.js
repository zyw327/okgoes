const Exception = require('../Exception');

class MailException extends Exception {
    constructor(message, code, options) {
        super(message, code);
        this.options = options;
    }
}

module.exports = MailException;