const FieldType = require('./Field/Type');
const MysqlException = require('./Exception');
/**
 * mysql fields
 */
class Field {
    /**
     * 
     * @param {Object} defindFields 
     */
    constructor(defindFields) {
        this.attr = [];
        this.createSql = '';
        this.primaryKey = null;
        this.define(defindFields);
    }
    /**
     * 
     * @param {Object} defindFields 
     */
    define(defindFields) {
        this.fields = defindFields;
        this.createSql = this._parse();
    }

    /**
     * 
     */
    _parse() {
        this.attr = [];
        let createSql = '';
        for (let key in this.fields) {
            if (this.fields.hasOwnProperty(key)) {
                let value = this.fields[key];
                this.attr.push(key);
                let type = null;
                if (!value.type || !(value.type instanceof Object) && (typeof(value.type) != 'function')) {
                    throw new MysqlException(Field.TYPE_ERROR, Field.TYPE_ERROR_CODE);
                }
                type = (typeof(value.type) == 'function' ? new value.type() : value.type)
                createSql += '`' + key + '` ' + type.sql;
                if (value.isPrimary) {
                    this.primaryKey = key;
                    createSql += ' PRIMARY KEY';
                }

                if (!value.isAllowNull) {
                    createSql += ' NOT NULL';
                }

                if (value.autoIncrement) {
                    createSql += ' auto_increment';
                }
                createSql += ',';
            }
        }
        return createSql.substr(0, createSql.length - 1);
    }
}

for (let key in FieldType) {
    Field[key] = FieldType[key];
}
Field.TYPE_ERROR = '类型错误';
Field.TYPE_ERROR_CODE = '1000';
module.exports = Field;