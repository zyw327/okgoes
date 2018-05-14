const Debug = require('../Debug');
/**
 * mysql debug info and export class
 */
module.exports = class MysqlDebug extends Debug {
    /**
     * 
     * @param {Boolean} isDebug 
     * @param {Number} debugType 
     * @api public
     */
    constructor(isDebug, debugType) {
        super(isDebug, debugType);
    }
    /**
     * print sql
     * @param {String} sql 
     * @api public
     */
    print(sql) {
        let msg = '【' + (new Date()).toLocaleString() + '】 ' + sql;
        this.outPut(msg);
    }
}
