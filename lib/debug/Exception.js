const Exception = require('../Exception');
/**
 * debug exception and export class
 */
class DebugException extends Exception {
    /**
     * 
     * @param {String} message 
     * @param {Number} code 
     * @api public
     */
    constructor(message, code) {
        super(message, code);
    }
}

DebugException.SAVA_PATH_IS_NOT_SETTING = '调试日志保存路径未设置';
DebugException.SAVA_PATH_IS_NOT_SETTING_CODE = '6004';

module.exports = DebugException;
