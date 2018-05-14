const MysqlException = require('./Exception');
/**
 * mysql parse and export class
 */
module.exports = class Parse {
    /**
     * @api public
     */
    constructor() {
        this.op = ['$in', '$between', '$like', '$gt', '$lt', '$gte', '$lte', '$not', '$is', '$nin', '$ne'];
    }
    /**
     * parse where
     * @param {Mixed} where 
     * @param {Mixed} table 
     * @return {String}
     * @api public
     */
    where(where, table) {
        if (!where || (typeof(where) != 'object')) {
            return null;
        }

        if (JSON.stringify(where) == '{}' || (where instanceof Array)) {
            return null;
        }
        let str = '';
        if (where.$and) {
            str = "(" + this._parseAnd(where.$and, table) + ")";
        }

        if (where.$or) {
            str += " (" + this._parseOr(where.$or, table) + ") ";
        }
        let pStr = this._parse(where, 'AND', table);
        return str + ((/^\s+$/.test(pStr) || pStr == '') ? '' : ((/^\s+$/.test(str) || str == '') ? '' : 'AND ') + pStr);
    }
    /**
     * parse and
     * @param {Mixed} and 
     * @param {String} table 
     * @api private
     */
    _parseAnd(and, table) {
        if (!(and instanceof Array)) {
            return '';
        }
        let str = '';
        for (let value of and) {
            str += this._parse(value, 'AND', table) + ' AND ';
        }
        return str.substr(0, str.length - 5);
    }
    /**
     * parse or
     * @param {Mixed} and 
     * @param {String} table 
     * @api private
     */
    _parseOr(or, table) {
        if (!(or instanceof Array)) {
            return '';
        }

        let str = '';
        for (let value of or) {
            str += this._parse(value, 'AND', table) + ' OR ';
        }
        return str.substr(0, str.length - 4);
    }

    /**
     * parse where
     * @param {Object} where 
     * @param {String} link 
     * @param {String} table 
     * @api private
     */
    _parse(where, link, table) {
        let str = '';
        let params = [];
        for (let key in where) {
            if (where.hasOwnProperty(key) && key.toLowerCase() != '$and' && key.toLowerCase() != '$or') {
                let value = where[key];
                if (typeof(value) != 'object' && value !== null && value !== undefined) {
                    str += '`' + table + '`.`' + key + '`' + ' = ' + (typeof(value) === 'number' ? value : "'" + value + "'") + ' ' + link + ' ';
                }

                if (value === null && value === undefined) {
                    str += '`' + table + '`.`' + key + '`' + ' IS NULL ' + link + ' ';
                }

                if (!(value instanceof Array) && typeof(value) == 'object') {
                    str += '`' + table + '`.`' + key + '`' + this._parseOperator(value) + ' ' + link + ' ';
                }
            }
        }
        return str.substr(0, str.length - 5);
    }
    /**
     * parse where operator
     * @param {Object} value 
     * @return {String}
     * @api private
     */
    _parseOperator(value) {
        for (let key in value) {
            if (value.hasOwnProperty(key) && this.op.indexOf(key) !== -1) {
                let sValue = value[key];
                switch (key.toLowerCase()) {
                    case '$in':
                        if (sValue instanceof Array && sValue.length) {
                            return ' IN (' + sValue.join(',') + ') ';
                        }
                        break;
                    case '$nin':
                        if (sValue instanceof Array && sValue.length) {
                            return ' NOT IN (' + sValue.join(',') + ') ';
                        }
                        break;
                    case '$between':
                        if (sValue instanceof Array && sValue.length > 2) {
                            return ' BETWEEN ' + sValue[0] + ' AND ' + sValue[0];
                        }
                        break;
                    case '$like':
                        if (typeof(sValue) === 'string') {
                            return ' LIKE \'' + sValue + '\'';
                        }
                        break;
                    case '$ne':
                        if (typeof(sValue) === 'string' || typeof(sValue) === 'number' || sValue instanceof Date) {
                            return ' <> ' + (typeof(sValue) === 'number' ? sValue : "'" + sValue + "'");
                        }
                        break;
                    case '$gt':
                        if (typeof(sValue) === 'string' || typeof(sValue) === 'number' || sValue instanceof Date) {
                            return ' > ' + (typeof(sValue) === 'number' ? sValue : "'" + sValue + "'");
                        }
                        break;
                    case '$lt':
                        if (typeof(sValue) === 'string' || typeof(sValue) === 'number' || sValue instanceof Date) {
                            return ' < ' + (typeof(sValue) === 'number' ? sValue : "'" + sValue + "'");                                
                        }
                        break;
                    case '$gte':
                        if (typeof(sValue) === 'string' || typeof(sValue) === 'number' || sValue instanceof Date) {
                            return ' >= ' + (typeof(sValue) === 'number' ? sValue : "'" + sValue + "'");       
                        }
                        break;
                    case '$lte':
                        if (typeof(sValue) === 'string' || typeof(sValue) === 'number' || sValue instanceof Date) {
                            return ' <= ' + (typeof(sValue) === 'number' ? sValue : "'" + sValue + "'");        
                        }
                        break;
                    case '$not':
                        return ' IS NOT ' + ((typeof(value.$not) === 'number'|| (value.$not === null)) ? value.$not : "'" + value.$not + "'");
                        break;
                    case '$is':
                        return ' IS ' + ((typeof(value.$is) === 'number' || (value.$is === null)) ? value.$is : "'" + value.$is + "'");
                        break;
                }
                break;
            }
        }
        return '';
    }

    /**
     * parse table
     * @param {Mixed} table 
     * @return {String}
     * @public
     */
    table(table) {
        if (typeof(table) === 'string') {
            return '`' + table + '`';
        }

        if (typeof(table) === 'object') {
            return this._parseObjectTable(table);
        }
        return '`' + table + '`';
    }
    /**
     * parse table
     * @param {Object} table 
     * @api private
     */
    _parseObjectTable (table) {
        let str = '';
        if (table.name) {
            str = '`' + table.name + '`';
        }

        if (table.as) {
            str += ' AS `' + table.as + '`';
        }
        return str;
    }
    /**
     * get table name
     * @param {Mixed} table 
     * @return {String}
     * @api public
     */
    getTableName(table) {
        if (typeof(table) === 'string') {
            return table;
        }

        if (typeof(table) === 'object') {
            let str = '';
            if (table.name) {
                str = table.name;
            }

            if (table.as) {
                str = table.as;
            }
            return str;
        }
        return table;
    }
    /**
     * parse insert or update data
     * @param {Object} data 
     * @return {String}
     * @api public 
     */
    insertOrUpdateData(data) {
        if (typeof(data) !== 'object') {
            throw new MysqlException(MysqlException.INSERT_OR_UPDATE_DATA_IS_MUST, MysqlException.INSERT_OR_UPDATE_DATA_IS_MUST_CODE); 
        }

        if (data instanceof Array && !data.length) {
            throw new MysqlException(MysqlException.INSERT_OR_UPDATE_DATA_IS_MUST, MysqlException.INSERT_OR_UPDATE_DATA_IS_MUST_CODE);
        }

        if (data instanceof Array) {
            data = data[0];
        }
        let str = '';
        for (let key in data) {
            if (data.hasOwnProperty(key)) {
                let value = data[key];
                str += '`' + key + '` = ' + (typeof(value) !== 'number' ? "'" + value.toString() + "'" : value) + ',';
            }
        }
        return str.substr(0, str.length - 1);
    }
    /**
     * parse insert many data
     * @param {Mixed} data 
     * @return {String}
     * @api public
     */
    insertManyData(data) {
        if (typeof(data) !== 'object') {
            throw new MysqlException(MysqlException.INSERT_OR_UPDATE_DATA_IS_MUST, MysqlException.INSERT_OR_UPDATE_DATA_IS_MUST_CODE); 
        }

        if (data instanceof Array && !data.length) {
            throw new MysqlException(MysqlException.INSERT_OR_UPDATE_DATA_IS_MUST, MysqlException.INSERT_OR_UPDATE_DATA_IS_MUST_CODE);
        }

        if (!(data instanceof Array)) {
            data = [data];
        }
        let strfield = '';
        let strValue = '';
        for (let value of data) {
            strfield = '('
            strValue += '(';
            for (let field in value) {
                if (value.hasOwnProperty(field)) {
                    let svalue = value[field];
                    strfield += '`' + field + '`,';
                    strValue += (typeof(svalue) !== 'number' ? "'" + svalue.toString() + "'" : svalue) + ',';
                }
            }
            strValue = strValue.substr(0, strValue.length - 1);
            strfield = strfield.substr(0, strfield.length - 1);
            strValue += '),';
            strfield += ')';
        }
        return strfield + ' VALUES ' + strValue.substr(0, strValue.length - 1);
    }
}
