const Validator = require('../Validator');
const EmailException = require('./Exception');
class EmailValidator extends Validator {
    constructor() {
        super();
    }

    checkOptions(options) {
        if (this.isEmpty(options)) {
            throw new EmailException('邮件发送配置不能为空', '4004');
        }
    }

    checkConfig(config) {
        if (this.isEmpty(config)) {
            throw new EmailException('邮件配置不能为空', '4004');
        }
        return true;
    }
}

module.exports = EmailValidator;