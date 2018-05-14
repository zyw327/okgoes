const Exception = require('../Exception');
/**
 * mysql exception and export class
 */
module.exports = class MysqlException extends Exception{
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

MysqlException.TABLE_IS_MUST = '未指定表名';
MysqlException.TABLE_IS_MUST_CODE = '4004';
MysqlException.INSERT_OR_UPDATE_DATA_IS_MUST = '必须指定插入或更新的数据且必须是对象';
MysqlException.INSERT_OR_UPDATE_DATA_IS_MUST_CODE = '5000';
MysqlException.UPDATE_WHERE_IS_MUST = '更新条件必须有，除非设置updateAll为true';
MysqlException.UPDATE_WHERE_IS_MUST_CODE = '5001';
