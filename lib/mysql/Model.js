const Mysql = require('../Mysql');
const MysqlValidator = require('./Validator');
const MysqlException = require('./Exception');
/**
 * mysql model
 */
module.exports = class MysqlModel {
    /**
     * 
     * @param {String} table 
     * @param {String} alias 
     */
    constructor(table, alias) {
        this.alias = alias || table;
        this.table = table;
        this.dbAdapter = null;
        this.mysqlValidator = new MysqlValidator();
    }

   /**
    * set mysql db adapter
    * @param {Mysql} dbAdapter 
    */
    setDbAdapter(dbAdapter) {
        this.dbAdapter = dbAdapter;
    }

    /**
     * 
     * @param {Object} options 
     */
    async find(options) {
        let select = this.dbAdapter.getSelect();
        select.from(this._buildTable());
    }
    /**
     * 
     * @param {Object} options 
     */
    async findAll(options) {

    }
    /**
     * 
     * @param {Object} options 
     */
    async findAllAndCount(options) {

    }
    /**
     * 
     * @param {Object} options 
     */
    async findOne(options) {

    }
    /**
     * 
     * @param {Object} data 
     * @param {Object} where 
     */
    async update(data, where) {

    }
    /**
     * 
     * @param {Object} data 
     */
    async insert(data) {

    }
    /**
     * insert many
     * @param {Array} data 
     */
    async insertMany(data) {

    }
    /**
     * 
     * @param {Object} where 
     */
    async delete(where) {

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