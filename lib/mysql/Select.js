const ParseSelect = require('./parse/Select')
const MysqlException = require('./Exception');

class Select {
    constructor(pool, mysqlDebug) {
        this.pool = pool;
        this.parseSelect = new ParseSelect();
        this.fromTable = null;
        this.whereOptions = null;
        this.joinOptions = [];
        this.limitValue = null;
        this.offsetValue = null;
        this.orderOptions = null;
        this.groupOptions = null;
        this.mysqlDebug = mysqlDebug;
    }

    /**
     * 
     * @param {String} table 
     * @param {Array} fields 
     */
    from(table, fields) {
        this.fromTable = {table: table, fields: fields};
        return this;
    }

    count(table, fields) {
        if (typeof(fields) !== 'string') {
            fields = 'count(*) count';
        } else {
            fields = 'count(' + fields + ') count';
        }
        this.fromTable = {table: table, fields: fields};
        return this;
    }

    /**
     * 
     * @param {Object} options 
     */
    where(options) {
        this.whereOptions = options;
        return this;
    }

    /**
     * 
     * @param {Object} options 
     */
    join(options) {
        this.joinOptions.push(options);
        return this;
    }
    
    limit(limit) {
        this.limitValue = limit;
        return this;
    }

    offset(offset) {
        this.offsetValue = offset;
        return this;
    }

    order(options) {
        this.orderOptions = options;
        return this;
    }

    group(options) {
        this.groupOptions = options;
        return this;
    }

    /**
     * 查询所有
     */
    fetchAll() {
        let sql = '';
        if (typeof(this.fromTable) !== 'object' || JSON.stringify(this.fromTable) == '{}' || !this.fromTable.table) {
            throw new MysqlException(MysqlException.TABLE_IS_MUST, MysqlException.TABLE_IS_MUST_CODE);
        }

        sql += 'SELECT ' + this.parseSelect.fields(this.fromTable.table, this.fromTable.fields) + ' ${{JOINFIELD}} '  + ' FROM ' + this.parseSelect.table(this.fromTable.table);
        
        let joinWhere = '';
        let orderStr = '';
        let groupStr = '';

        if (this.joinOptions instanceof Array && this.joinOptions.length) {
            let attr = '';
            for (let value of this.joinOptions) {
                if (!value.fromTable || !/\S+/.test(value.fromTable)) {
                    value.fromTable = this.parseSelect.getTableName(this.fromTable.table);
                }
                let join = this.parseSelect.join(value);
                sql += " " + join.joinStr;
                attr += join.attr + ',';
                if (join.where && join.where.length > 0) {
                    joinWhere += ' AND ' + join.where;
                }
                if (join.orderStr && join.orderStr.length > 0) {
                    orderStr += join.orderStr + ',';
                }

                if (join.groupStr && join.groupStr.length > 0) {
                    groupStr += join.groupStr + ',';
                }
            }
            attr = attr.substr(0, attr.length - 1);
            sql = sql.replace(' ${{JOINFIELD}} ', /^\s+$/.test(attr) || attr == '' ? '' : ',' + attr);
        } else {
            sql = sql.replace(' ${{JOINFIELD}} ', '');
        }
        
        if (this.whereOptions) {
            sql += ' WHERE ' + this.parseSelect.where(this.whereOptions, this.parseSelect.getTableName(this.fromTable.table));
            if (joinWhere) {
                sql += joinWhere;
            }
        } else if (joinWhere && joinWhere != '' && !/^\s+$/.test(joinWhere)) {
            sql += ' WHERE ' + joinWhere.substr(5);
        }

        if (this.groupOptions instanceof Array && this.groupOptions.length) {
            sql += " GROUP BY " + this.parseSelect.group(this.groupOptions, this.parseSelect.getTableName(this.fromTable.table));
            if (groupStr) {
                sql += ',' + groupStr.substr(0, groupStr.length - 1);
            }
        } else if (groupStr) {
            sql += " GROUP BY " + groupStr.substr(0, groupStr.length - 1);
        }

        if (this.orderOptions instanceof Array && this.orderOptions.length) {
            sql += " ORDER BY " +  this.parseSelect.order(this.orderOptions, this.parseSelect.getTableName(this.fromTable.table));
            if (orderStr)  {
                sql += ',' + orderStr.substr(0, orderStr.length - 1);
            }
        } else if (orderStr)  {
            sql += " ORDER BY " + orderStr.substr(0, orderStr.length - 1);
        }

        if (typeof(this.limitValue) === 'number' && typeof(this.offsetValue) === 'number') {
            sql += ' LIMIT ' + this.offsetValue + ', ' + this.limitValue;
        }

        if (typeof(this.limitValue) === 'number' && typeof(this.offsetValue) !== 'number') {
            sql += ' LIMIT 0, ' + this.limitValue;
        }
        this.mysqlDebug.print(sql);
        this.fromTable = null;
        this.whereOptions = null;
        this.joinOptions = [];
        this.limitValue = null;
        this.offsetValue = null;
        this.orderOptions = null;
        this.groupOptions = null;

        return new Promise((resolve, reject) => {
            this.pool.query(sql, function (error, results, fields) {
                if (error) return reject(error);
                resolve(results);
            });
        });
    }

    /**
     * 查询一条
     */
    async fetchOne() {
        this.offsetValue = 0;
        this.limitValue = 1;
        return await this.fetchAll();
    }

    /**
     * 查询所有
     */
    async fetch() {
        return await this.fetchAll();
    }

    toString() {
        let sql = '';
        if (typeof(this.fromTable) !== 'object' || JSON.stringify(this.fromTable) == '{}' || !this.fromTable.table) {
            throw new MysqlException(MysqlException.TABLE_IS_MUST, MysqlException.TABLE_IS_MUST_CODE);
        }

        sql += 'SELECT ' + this.parseSelect.fields(this.fromTable.table, this.fromTable.fields) + ' ${{JOINFIELD}} '  + ' FROM ' + this.parseSelect.table(this.fromTable.table);
        
        let joinWhere = '';
        let orderStr = '';
        let groupStr = '';

        if (this.joinOptions instanceof Array && this.joinOptions.length) {
            let attr = '';
            for (let value of this.joinOptions) {
                if (!value.fromTable || !/\S+/.test(value.fromTable)) {
                    value.fromTable = this.parseSelect.getTableName(this.fromTable.table);
                }
                let join = this.parseSelect.join(value);
                sql += " " + join.joinStr;
                attr += join.attr + ',';
                if (join.where && join.where.length > 0) {
                    joinWhere += ' AND ' + join.where;
                }
                if (join.orderStr && join.orderStr.length > 0) {
                    orderStr += join.orderStr + ',';
                }

                if (join.groupStr && join.groupStr.length > 0) {
                    groupStr += join.groupStr + ',';
                }
            }
            attr = attr.substr(0, attr.length - 1);
            sql = sql.replace(' ${{JOINFIELD}} ', /^\s+$/.test(attr) || attr == '' ? '' : ',' + attr);
        }

        if (this.whereOptions) {
            sql += ' WHERE ' + this.parseSelect.where(this.whereOptions, this.parseSelect.getTableName(this.fromTable.table));
            if (joinWhere) {
                sql += joinWhere;
            }
        } else if (joinWhere && joinWhere != '' && !/^\s+$/.test(joinWhere)) {
            sql += ' WHERE ' + joinWhere.substr(5);
        }

        if (this.groupOptions instanceof Array && this.groupOptions.length) {
            sql += " GROUP BY " + this.parseSelect.group(this.groupOptions, this.parseSelect.getTableName(this.fromTable.table));
            if (groupStr) {
                sql += ',' + groupStr.substr(0, groupStr.length - 1);
            }
        } else if (groupStr) {
            sql += " GROUP BY " + groupStr.substr(0, groupStr.length - 1);
        }

        if (this.orderOptions instanceof Array && this.orderOptions.length) {
            sql += " ORDER BY " +  this.parseSelect.order(this.orderOptions, this.parseSelect.getTableName(this.fromTable.table));
            if (orderStr)  {
                sql += ',' + orderStr.substr(0, orderStr.length - 1);
            }
        } else if (orderStr)  {
            sql += " ORDER BY " + orderStr.substr(0, orderStr.length - 1);
        }

        if (typeof(this.limitValue) === 'number' && typeof(this.offsetValue) === 'number') {
            sql += ' LIMIT ' + this.offsetValue + ', ' + this.limitValue;
        }

        if (typeof(this.limitValue) === 'number' && typeof(this.offsetValue) !== 'number') {
            sql += ' LIMIT 0, ' + this.limitValue;
        }

        this.fromTable = null;
        this.whereOptions = null;
        this.joinOptions = [];
        this.limitValue = null;
        this.offsetValue = null;
        this.orderOptions = null;
        this.groupOptions = null;
        return sql;
    }
}

module.exports = Select;