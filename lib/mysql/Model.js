const Mysql = require('../Mysql');
const MysqlValidator = require('./Validator');
const MysqlException = require('./Exception');
const MysqlFields = require('./Field');
/**
 * mysql model
 */
class MysqlModel {
    /**
     * 
     * @param {Mixed} table 
     * @param {String} alias 
     */
    constructor(table, defineField) {
        if (typeof(table) === 'object') {
            this.alias = table.as || null;
            this.table = table.name;
        } else {
            this.table = table;
            this.alias = null;
        }
        this.dbAdapter = null;
        this.mysqlValidator = new MysqlValidator();
        this.mysqlFields = new MysqlFields(defineField);
    }

   /**
    * set mysql db adapter
    * @param {Mysql} dbAdapter 
    */
    setDbAdapter(dbAdapter) {
        this.dbAdapter = dbAdapter;
    }

    /**
     * get mysql db adapter
     */
    getDbAdapter() {
        return this.dbAdapter;
    }

    /**
     * create table
     */
    async create(isForce = false, transaction = null) {
        let createSql = "CREATE TABLE `" + this.table + '` (' + this.mysqlFields.createSql + ') ENGINE=INNODB DEFAULT CHARSET=utf8';
        if (isForce) {
            transaction = await this.dbAdapter.transaction();
            try {
                this.dbAdapter.mysqlDebug.print("DROP TABLE IF EXISTS `" + this.table + "` ");
                await this.dbAdapter.query( "DROP TABLE IF EXISTS `" + this.table + "` ", {transaction: transaction});
                this.dbAdapter.mysqlDebug.print(createSql);
                let res = await this.dbAdapter.query(createSql, {transaction: transaction} );
                await transaction.commit();
                return res;
            } catch (error) {
                console.log(error);
                await transaction.rollback();
            }
        }
        let sql = "SHOW TABLES LIKE '" + this.table + "'";
        this.dbAdapter.mysqlDebug.print(sql);
        let table = await this.dbAdapter.query(sql, {transaction: transaction});
        if (!table || !table.length) {
            this.dbAdapter.mysqlDebug.print(createSql);
            return await this.dbAdapter.query(createSql, {transaction: transaction});
        }
        return false;
    }

    /**
     * find
     * @param {Object} options 
     */
    async find(options) {
        options = options || {};
        if (!options.attr) {
            options.attr = this.mysqlFields.attr;
        }
        options.table = this._buildTable();
        return await this.dbAdapter.find(options);
    }
    /**
     * findAll
     * @param {Object} options 
     */
    async findAll(options) {
        options = options || {};
        if (!options.attr) {
            options.attr = this.mysqlFields.attr;
        }
        options.table = this._buildTable();
        return await this.dbAdapter.findAll(options);
    }
    /**
     * 
     * @param {Object} options 
     */
    async findAllAndCount(options) {
        options = options || {};
        if (!options.attr) {
            options.attr = this.mysqlFields.attr;
        }
        options.table = this._buildTable();
        let rows = await this.dbAdapter.findAll(options);
        options.attr = null;
        options.field = this.mysqlFields.primaryKey || null;
        let count = await this.dbAdapter.count(options);
        return {rows: rows, count: count};
    }
    /**
     * 
     * @param {Object} options 
     */
    async findOne(options) {
        options = options || {};
        if (!options.attr) {
            options.attr = this.mysqlFields.attr;
        }
        options.table = this._buildTable();
        return await this.dbAdapter.findOne(options);
    }
    /**
     * 
     * @param {Object} data 
     * @param {Object} where 
     */
    async update(data, where) {
        let options = {};
        options.where = where;
        options.table = this.table;
        return await this.dbAdapter.update(data, options);
    }
    /**
     * 
     * @param {Object} data 
     */
    async insert(data) {
        let options = {};
        options.table = this.table;
        return await this.dbAdapter.insert(data, options);
    }
    /**
     * insert many
     * @param {Array} data 
     */
    async insertMany(data) {
        let options = {};
        options.table = this.table;
        return await this.dbAdapter.insertMany(data, options);
    }
    /**
     * 
     * @param {Object} where 
     */
    async delete(where) {
        let options = {};
        options.where = where;
        options.table = this.table;
        return await this.dbAdapter.delete(options);
    }
    
    /**
     * build table
     */
    _buildTable() {
        if (this.mysqlValidator.isEmpty(this.table)) {
            throw new MysqlException(MysqlException.TABLE_IS_MUST, MysqlException.TABLE_IS_MUST_CODE);
        }
        if (!this.mysqlValidator.isEmpty(this.alias)) {
            return {name: this.table, as: this.alias};
        }
        return this.table;
    }
}
MysqlModel.Field = MysqlFields;
module.exports = MysqlModel