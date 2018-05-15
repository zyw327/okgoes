const mysql = require('mysql');
const Select = require('./mysql/Select');
const MysqlException = require('./mysql/Exception');
const MysqlDebug = require('./mysql/Debug');
const MysqlParse = require('./mysql/Parse');

var pool = null;
/**
 * Mysql操作类
 */
class Mysql {
    /**
     * 创建连接池
     * @param {Object} options 
     */
    constructor(options) {
        if (!pool) {
            pool = mysql.createPool({
                connectionLimit : options.connectionLimit,
                host            : options.host,
                user            : options.user,
                password        : options.passwd,
                database        : options.database,
                acquireTimeout: options.acquireTimeout || 10000,
                connectTimeout: options.connectTimeout || 10000,
                waitForConnections: options.waitForConnections || true,
                queueLimit: options.queueLimit || 0,
                port: options.port || 3306,
                socketPath: options.socketPath || null,
                charset: options.charset || "UTF8_GENERAL_CI",
                timezone: options.timezone || 'local',
                stringifyObjects: options.stringifyObjects || false,
                supportBigNumbers: options.supportBigNumbers || false,
                bigNumberStrings: options.bigNumberStrings || null,
                dateStrings: options.dateStrings || false,
                debug: options.debug || false,
                trace: options.trace || true,
                multipleStatements: options.multipleStatements || false,
                ssl: options.ssl || null,
                flags: options.flags || null
            });
        }
        this.mysqlParse = new MysqlParse();
        this.isDebug = options.isDebug || Mysql.DEBUG_ON;
        this.debugType = options.debugType || Mysql.DEBUG_CONSOLE;
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
        if (options.transaction && options.transaction instanceof Transaction) {
            return new Promise((resolve, reject) => {
                options.transaction.connection.query(sql, function (error, results, fields) {
                    if (error) return reject(error);
                    resolve(results);
                });
            });
        }
        return new Promise((resolve, reject) => {
            pool.query(sql, function (error, results, fields) {
                if (error) return reject(error);
                resolve(results);
            });
        });
    }

    /**
     * 开启事务
     * @return Transaction
     */
    transaction() {
        return new Promise((resolve, reject) => {
            pool.getConnection(function(err, connection) {
                if (err) return reject(err);
                connection.beginTransaction(err => {
                    if (err) return reject(err);
                });
                // console.log('BEGIN TRANSACTION');
                this.mysqlDebug.print('BEGIN TRANSACTION');
                resolve(new Transaction(connection));
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
        return await select.count(options.table, options.field)
        .where(options.where)
        .fetchAll();
    }
}
/**
 * transaction
 */
class Transaction {
    constructor(connection) {
        this.connection = connection;
        this.inTransaction = true;
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
                // console.log("COMMIT");
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
                // console.log("ROLLBACK");
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

module.exports = Mysql;