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
     * create table
     */
    async create() {

    }

    /**
     * find
     * @param {Object} options 
     */
    async find(options) {
        options = options || {};
        options.table = this._buildTable();
        return await this.dbAdapter.find(options);
    }
    /**
     * findAll
     * @param {Object} options 
     */
    async findAll(options) {
        options = options || {};
        options.table = this._buildTable();
        return await this.dbAdapter.findAll(options);
    }
    /**
     * 
     * @param {Object} options 
     */
    async findAllAndCount(options) {
        options = options || {};
        options.table = this._buildTable();
        return {rows: await this.dbAdapter.findAll(options), count: await this.dbAdapter.count(options)};
    }
    /**
     * 
     * @param {Object} options 
     */
    async findOne(options) {
        options = options || {};
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