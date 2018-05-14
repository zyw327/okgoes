const Parse = require('../Parse');
const MysqlException = require('../Exception');

class ParseSelect extends Parse {
    constructor() {
        super();
    }

    fields(table, fields) {
        if (typeof(table) === 'object') {
            table = table.as || table.name;
        }
        if (typeof(fields) === 'string') {
            fields = fields.split(',');
        }
        if (fields instanceof Array && fields.length) {
            return this._parseArrayFields(table, fields);
        }
        return "`" + table + '`.' + "*";
    }

    _parseArrayFields(table, fields) {
        let str = '';
        for (let value of fields) {
            if (typeof(value) === 'string') {
                str += "`" + table + '`.`' + value.trim() + '`,';
            }

            if (value instanceof Array && value.length === 1) {
                str += "`" + table + '`.`' + value[0].trim() + '`,';
            }

            if (value instanceof Array && value.length > 1) {
                str += "`" + table + '`.`' + value[0].trim() + '` AS `' + value[1] + '`,';
            }
        }

        if (!str.length) {
            return "`" + table + '`.' + "*";
        }
        return str.substr(0, str.length - 1);
    }

    join(options) {
        let str = '';
        if (!options.table) {
            throw new MysqlException(MysqlException.TABLE_IS_MUST, MysqlException.TABLE_IS_MUST_CODE);
        }

        if (typeof(options.table) !== 'object') {
            throw new MysqlException(MysqlException.TABLE_IS_MUST, MysqlException.TABLE_IS_MUST_CODE);
        }

        let joinWay = options.joinWay || 'INNER JOIN';
        joinWay = joinWay.toString().toUpperCase();
        str += joinWay + " " + this.table(options.table) + ' ON ' + this._parseJoinCondition(options.refer, this.getTableName(options.table), this.getTableName(options.fromTable));
        let groupStr = '';
        let orderStr = '';
        
        if (options.group) {
            groupStr = this.group(options.group, this.getTableName(options.table));
        }

        if (options.order) {
            orderStr = this.order(options.order, this.getTableName(options.table));
        }

        return {joinStr: str, attr: options.attr ? this.fields(options.table, options.attr) : '', where: this.where(options.where, this.getTableName(options.table)), groupStr: groupStr, orderStr: orderStr};
    }

    _parseJoinCondition(where, table, fromTable) {
        if (typeof(where) === 'string') {
            return where;
        }
        if (typeof(where) !== 'object') {
            throw new MysqlException(MysqlException.TABLE_IS_MUST, MysqlException.TABLE_IS_MUST_CODE);
        }
        let str = '';
        for (let key in where) {
            if (where.hasOwnProperty(key)) {
                str += '`' + table + '`.`' + key + '` = `' + fromTable + '`.`' + where[key] + '`';
            }
        }
        return str;
    }

    order(order, table) {
        let str = '';
        for (let value of order) {
            if (value instanceof Array && value.length) {
                str += (value.length === 1 ? '`' + table + '`.`' + value[0] + '`' : '`' + table + '`.`' + value[0] + '`' + ( + ['ASC', 'DESC'].indexOf(value[1].toString().toUpperCase()) !== -1 ?  ' ' + value[1].toString().toUpperCase() + ',' : ','));
            } else if (typeof(value) === 'string') {
                str += '`' + table + '`.`' + value + '`,';
            }
        }
        return str.length ? str.substr(0, str.length - 1) : '';
    }

    group(group, table) {
        let str = '';
        for (let value of group) {
            str += '`' + table + '`.`' + value + '`,';
        }
        return str.length ? str.substr(0, str.length - 1) : '';
    }
}

module.exports = ParseSelect;