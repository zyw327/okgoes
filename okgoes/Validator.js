const ValidatorException = require('./validator/Exception');
class Validator {
    constructor() {

    }

    isEmail(email) {
        if (/^(\w+)\@(\w+)\.(\w+)$/.test(email)) {
            return true;
        }
        return false;
    }

    isEmpty(param) {
        if (typeof(param) === 'string' && /^\s+$/.test(param)) {
            return true;
        }

        if (param instanceof Array && param.length === 0) {
            return true;
        }

        if (param instanceof Object && JSON.stringify(param) == '{}') {
            return true;
        }

        if (typeof(param) !== 'string' && param instanceof Object) {
            throw new ValidatorException('不支持的类型', 5001);
        }
        return false;
    }
}

module.exports = Validator;