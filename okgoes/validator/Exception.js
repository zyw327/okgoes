const Exception = require('../Exception');
class ValidatorException extends Exception {
    constructor(message, code) {
        super(message, code);
    }
}

module.exports = ValidatorException;