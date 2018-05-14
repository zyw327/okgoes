const Validator = require('../Validator');
const EmailException = require('./Exception');
/**
 * email validator and export validator
 */
module.exports = class EmailValidator extends Validator {
    /**
     * @api public
     */
    constructor() {
        super();
    }
    /**
     * 
     * @param {Object} options 
     * @return {Boolean}
     */
    checkOptions(options) {
        if (this.isEmpty(options)) {
            throw new EmailException('邮件发送配置不能为空', 4004);
        }
        return true;
    }

    /**
     * 
     * @param {Object} config 
     * @return {Boolean}
     */
    checkConfig(config) {
        if (this.isEmpty(config)) {
            throw new EmailException('邮件配置不能为空', 4004);
        }
        return true;
    }
}
