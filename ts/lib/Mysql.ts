// const mysql = require('mysql');
// const Select = require('./mysql/Select');
// const MysqlException = require('./mysql/Exception');
// const MysqlDebug = require('./mysql/Debug');
// const MysqlParse = require('./mysql/Parse');
// const Model = require('./mysql/Model');
const mysql = {
    createPool: (options: poolOptions) =>{
        return new Pool();
    }
};

class Model {

}

class MysqlParse {

}
class MysqlException {
    static UPDATE_WHERE_IS_MUST;
    static UPDATE_WHERE_IS_MUST_CODE;
    constructor(message: String, code: Number) {

    }
}
class MysqlDebug {
    constructor(isDebug: boolean, debugType: DebugType) {

    }
}
class Pool {
    query(sql: String, callback: Function) {

    }

    getConnection(callback: Function) {

    }
}

class Select {
    constructor(pool: Pool, mysqlDebug: MysqlDebug) {

    }

    from(table: String | Array<Object>, fields: String | Array<String>): Select {
        return this;
    }

    where(where: Object): Select {
        return this;
    }
    count(table: String | Array<Object>, filed: String):Select {
        return this;
    }

    group(group: Array<String>):Select {
        return this;
    }

    order(order: Array<Array<String>>): Select {
        return this;
    }

    limit(limit: Number): Select {
        return this;
    }

    offset(offset: Number): Select {
        return this;
    }

    fetchAll() : Array<Object> {
        return ;
    }

    fetchOne(): CountData {
        return ;
    }
}
interface CountData{
    count:Number
}
var pool: Pool = null;


interface DebugType {
    NONE:Number;
    CONSOLE:Number;
    FILE:Number;
}

declare interface poolOptions {
    connectionLimit : Number;
    host            : String;
    user            : String;
    password        : String;
    database        : String;
    acquireTimeout: Number;
    connectTimeout: Number;
    waitForConnections: Boolean;
    queueLimit: Number;
    port: Number;
    socketPath: String;
    charset: String;
    timezone: String;
    stringifyObjects: Boolean;
    supportBigNumbers: Boolean;
    bigNumberStrings: String;
    dateStrings: Boolean;
    debug: Boolean;
    trace: Boolean;
    multipleStatements: Boolean;
    ssl: String;
    flags: String;
    isDebug: Boolean;
    debugType: DebugType
}

/**
 * Mysql操作类
 */
class Mysql {
    private mysqlParse;
    private isDebug;
    private debugType;
    private mysqlDebug;
    static DEBUG_ON;
    static DEBUG_OFF;
    static DEBUG_CONSOLE;
    static DEBUG_FILE;
    static Model;
    constructor(public options: poolOptions) {
        if (!pool) {
            pool = mysql.createPool(options);
        }
        this.mysqlParse = new MysqlParse();
        this.isDebug = options.isDebug;
        this.debugType = options.debugType;
        this.mysqlDebug = new MysqlDebug(this.isDebug, this.debugType);
    }

    /**
     * 插入
     * @param {Object} data 
     * @param {Object} options 
     * @param {String} table 
     */
    async insert(data, options) {
        let sql = "INSERT INTO `" + options.table + "` SET " + this.mysqlParse.insertOrUpdateData(data);
        this.mysqlDebug.print(sql);
        return await this.query(sql, options);
    }
    /**
     * 批量插入
     * @param {Array} data 
     * @param {options} options 
     * @param {String} table 
     */
    async insertMany(data, options) {
        let sql = "INSERT INTO `" + options.table + "` " + this.mysqlParse.insertManyData(data);
        this.mysqlDebug.print(sql);
        return await this.query(sql, options);
    }

    /**
     * 
     * @param {Object} data 
     * @param {Object} options 
     * @param {String} table 
     */
    async update(data, options) {
        let sql = "UPDATE " + options.table + " SET " + this.mysqlParse.insertOrUpdateData(data);
        if (!options.where && !options.updateAll) {
            throw new MysqlException(MysqlException.UPDATE_WHERE_IS_MUST, MysqlException.UPDATE_WHERE_IS_MUST_CODE);
        }
        sql += ' WHERE ' + this.mysqlParse.where(options.where);
        this.mysqlDebug.print(sql);
        return await this.query(sql, options);
    }

    async delete(options) {
        let sql = 'DELETE FROM `' + options.table + " WHERE " + this.mysqlParse.where(options.where);
        this.mysqlDebug.print(sql);
        return await this.query(sql, options);
    }

    /**
     * @returns Select select
     */
    getSelect() {
        return new Select(pool, this.mysqlDebug);
    }
    /**
     * 
     * @param {String} sql 
     * @param {Object} options
     */
    query(sql, options) {
        if (options && options.transaction && options.transaction instanceof Transaction) {
            return new Promise((resolve, reject) => {
                options.transaction.connection.query(sql,  (error, results, fields) => {
                    if (error) return reject(error);
                    resolve(results);
                });
            });
        }
        return new Promise((resolve, reject) => {
            pool.query(sql, (error, results, fields) => {
                if (error) return reject(error);
                resolve(results);
            });
        });
    }

    /**
     * 开启事务
     * @return {Transaction}
     */
    transaction() {
        return new Promise((resolve, reject) => {
            pool.getConnection((err, connection) => {
                if (err) return reject(err);
                connection.beginTransaction(err => {
                    if (err) return reject(err);
                });
                this.mysqlDebug.print('BEGIN TRANSACTION');
                resolve(new Transaction(connection, this.mysqlDebug));
            });
        });
    }

    /**
     * 查询
     * @param {Object} options 
     */
    async find(options) {
        return await this.findAll(options);
    }

    /**
     * 查询所有
     * @param {Object} options 
     */
    async findAll(options) {
        let select = this.getSelect();
        return await select.from(options.table, options.attr)
        .where(options.where)
        .group(options.group)
        .order(options.order)
        .limit(options.limit)
        .offset(options.offset)
        .fetchAll();
    }

    /**
     * 查询一条
     * @param {Object} options 
     */
    async findOne(options) {
        let select = this.getSelect();
        return await select.from(options.table, options.attr)
        .where(options.where)
        .fetchOne();
    }

    /**
     * 查询所有并统计总条数
     * @param {Object} options 
     */
    async findAndCountAll(options) {
        let select = this.getSelect();
        let rows = await select.from(options.table, options.attr)
        .where(options.where)
        .group(options.group)
        .order(options.order)
        .limit(options.limit)
        .offset(options.offset)
        .fetchAll();
        let count = await select.count(options.table, '*')
        .where(options.where)
        .fetchAll();
        return {rows: rows, count: count};
    }

    /**
     * 统计条目
     * @param {Object} options
     */
    async count(options) {
        let select = this.getSelect();
        let data = await select.count(options.table, options.field)
        .where(options.where)
        .fetchOne();
        return data && data.count ? data.count : 0;
    }
}
/**
 * transaction
 */
class Transaction {
    private connection;
    private inTransaction;
    private mysqlDebug;
    constructor(connection, mysqlDebug) {
        this.connection = connection;
        this.inTransaction = true;
        this.mysqlDebug = mysqlDebug;
    }
    /**
     * commit
     * @return {Object}
     */
    commit() {
        return new Promise((resolve, reject) => {
            this.connection.commit(err => {
                if (err) {
                    this.connection.rollback(err => {
                        if (err) return reject(err);
                    });
                    return reject(err)
                }
                if (this.connection && this.connection.release) {
                    this.connection.release();
                }
                this.inTransaction = false;
                this.mysqlDebug.print('COMMIT');
                resolve(true);
            });
        });
    }
    /**
     * @return {Boolean}
     */
    isInTransaction() {
        return this.inTransaction;
    }
    /**
     * rollback
     * @return {Object}
     */
    rollback() {
        return new Promise((resolve, reject) => {
            this.connection.rollback(err => {
                if (err) return reject(err);
                if (this.connection && this.connection.release) {
                    this.connection.release();
                }
                this.inTransaction = false;
                this.mysqlDebug.print('ROLLBACK');
                resolve(true);
            });
        });
    }
}

Mysql.DEBUG_ON = 1;
Mysql.DEBUG_OFF = 2;
Mysql.DEBUG_CONSOLE = 1;
Mysql.DEBUG_FILE = 2;

Mysql.Model = Model;

export default Mysql;