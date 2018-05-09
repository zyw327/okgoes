const Exception = require('../Exception');
class ViewException extends Exception {
    constructor(message, code) {
        super(message, code);
    }
}

module.exports = ViewException;