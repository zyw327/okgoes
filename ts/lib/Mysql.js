"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
// const mysql = require('mysql');
// const Select = require('./mysql/Select');
// const MysqlException = require('./mysql/Exception');
// const MysqlDebug = require('./mysql/Debug');
// const MysqlParse = require('./mysql/Parse');
// const Model = require('./mysql/Model');
var mysql = {
    createPool: function (options) {
        return new Pool();
    }
};
var Model = /** @class */ (function () {
    function Model() {
    }
    return Model;
}());
var MysqlParse = /** @class */ (function () {
    function MysqlParse() {
    }
    return MysqlParse;
}());
var MysqlException = /** @class */ (function () {
    function MysqlException(message, code) {
    }
    return MysqlException;
}());
var MysqlDebug = /** @class */ (function () {
    function MysqlDebug(isDebug, debugType) {
    }
    return MysqlDebug;
}());
var Pool = /** @class */ (function () {
    function Pool() {
    }
    Pool.prototype.query = function (sql, callback) {
    };
    Pool.prototype.getConnection = function (callback) {
    };
    return Pool;
}());
var Select = /** @class */ (function () {
    function Select(pool, mysqlDebug) {
    }
    Select.prototype.from = function (table, fields) {
        return this;
    };
    Select.prototype.where = function (where) {
        return this;
    };
    Select.prototype.count = function (table, filed) {
        return this;
    };
    Select.prototype.group = function (group) {
        return this;
    };
    Select.prototype.order = function (order) {
        return this;
    };
    Select.prototype.limit = function (limit) {
        return this;
    };
    Select.prototype.offset = function (offset) {
        return this;
    };
    Select.prototype.fetchAll = function () {
        return;
    };
    Select.prototype.fetchOne = function () {
        return;
    };
    return Select;
}());
var pool = null;
/**
 * Mysql操作类
 */
var Mysql = /** @class */ (function () {
    function Mysql(options) {
        this.options = options;
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
    Mysql.prototype.insert = function (data, options) {
        return __awaiter(this, void 0, void 0, function () {
            var sql;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        sql = "INSERT INTO `" + options.table + "` SET " + this.mysqlParse.insertOrUpdateData(data);
                        this.mysqlDebug.print(sql);
                        return [4 /*yield*/, this.query(sql, options)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * 批量插入
     * @param {Array} data
     * @param {options} options
     * @param {String} table
     */
    Mysql.prototype.insertMany = function (data, options) {
        return __awaiter(this, void 0, void 0, function () {
            var sql;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        sql = "INSERT INTO `" + options.table + "` " + this.mysqlParse.insertManyData(data);
                        this.mysqlDebug.print(sql);
                        return [4 /*yield*/, this.query(sql, options)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     *
     * @param {Object} data
     * @param {Object} options
     * @param {String} table
     */
    Mysql.prototype.update = function (data, options) {
        return __awaiter(this, void 0, void 0, function () {
            var sql;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        sql = "UPDATE " + options.table + " SET " + this.mysqlParse.insertOrUpdateData(data);
                        if (!options.where && !options.updateAll) {
                            throw new MysqlException(MysqlException.UPDATE_WHERE_IS_MUST, MysqlException.UPDATE_WHERE_IS_MUST_CODE);
                        }
                        sql += ' WHERE ' + this.mysqlParse.where(options.where);
                        this.mysqlDebug.print(sql);
                        return [4 /*yield*/, this.query(sql, options)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    Mysql.prototype["delete"] = function (options) {
        return __awaiter(this, void 0, void 0, function () {
            var sql;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        sql = 'DELETE FROM `' + options.table + " WHERE " + this.mysqlParse.where(options.where);
                        this.mysqlDebug.print(sql);
                        return [4 /*yield*/, this.query(sql, options)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * @returns Select select
     */
    Mysql.prototype.getSelect = function () {
        return new Select(pool, this.mysqlDebug);
    };
    /**
     *
     * @param {String} sql
     * @param {Object} options
     */
    Mysql.prototype.query = function (sql, options) {
        if (options && options.transaction && options.transaction instanceof Transaction) {
            return new Promise(function (resolve, reject) {
                options.transaction.connection.query(sql, function (error, results, fields) {
                    if (error)
                        return reject(error);
                    resolve(results);
                });
            });
        }
        return new Promise(function (resolve, reject) {
            pool.query(sql, function (error, results, fields) {
                if (error)
                    return reject(error);
                resolve(results);
            });
        });
    };
    /**
     * 开启事务
     * @return {Transaction}
     */
    Mysql.prototype.transaction = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            pool.getConnection(function (err, connection) {
                if (err)
                    return reject(err);
                connection.beginTransaction(function (err) {
                    if (err)
                        return reject(err);
                });
                _this.mysqlDebug.print('BEGIN TRANSACTION');
                resolve(new Transaction(connection, _this.mysqlDebug));
            });
        });
    };
    /**
     * 查询
     * @param {Object} options
     */
    Mysql.prototype.find = function (options) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.findAll(options)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * 查询所有
     * @param {Object} options
     */
    Mysql.prototype.findAll = function (options) {
        return __awaiter(this, void 0, void 0, function () {
            var select;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        select = this.getSelect();
                        return [4 /*yield*/, select.from(options.table, options.attr)
                                .where(options.where)
                                .group(options.group)
                                .order(options.order)
                                .limit(options.limit)
                                .offset(options.offset)
                                .fetchAll()];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * 查询一条
     * @param {Object} options
     */
    Mysql.prototype.findOne = function (options) {
        return __awaiter(this, void 0, void 0, function () {
            var select;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        select = this.getSelect();
                        return [4 /*yield*/, select.from(options.table, options.attr)
                                .where(options.where)
                                .fetchOne()];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * 查询所有并统计总条数
     * @param {Object} options
     */
    Mysql.prototype.findAndCountAll = function (options) {
        return __awaiter(this, void 0, void 0, function () {
            var select, rows, count;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        select = this.getSelect();
                        return [4 /*yield*/, select.from(options.table, options.attr)
                                .where(options.where)
                                .group(options.group)
                                .order(options.order)
                                .limit(options.limit)
                                .offset(options.offset)
                                .fetchAll()];
                    case 1:
                        rows = _a.sent();
                        return [4 /*yield*/, select.count(options.table, '*')
                                .where(options.where)
                                .fetchAll()];
                    case 2:
                        count = _a.sent();
                        return [2 /*return*/, { rows: rows, count: count }];
                }
            });
        });
    };
    /**
     * 统计条目
     * @param {Object} options
     */
    Mysql.prototype.count = function (options) {
        return __awaiter(this, void 0, void 0, function () {
            var select, data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        select = this.getSelect();
                        return [4 /*yield*/, select.count(options.table, options.field)
                                .where(options.where)
                                .fetchOne()];
                    case 1:
                        data = _a.sent();
                        return [2 /*return*/, data && data.count ? data.count : 0];
                }
            });
        });
    };
    return Mysql;
}());
/**
 * transaction
 */
var Transaction = /** @class */ (function () {
    function Transaction(connection, mysqlDebug) {
        this.connection = connection;
        this.inTransaction = true;
        this.mysqlDebug = mysqlDebug;
    }
    /**
     * commit
     * @return {Object}
     */
    Transaction.prototype.commit = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.connection.commit(function (err) {
                if (err) {
                    _this.connection.rollback(function (err) {
                        if (err)
                            return reject(err);
                    });
                    return reject(err);
                }
                if (_this.connection && _this.connection.release) {
                    _this.connection.release();
                }
                _this.inTransaction = false;
                _this.mysqlDebug.print('COMMIT');
                resolve(true);
            });
        });
    };
    /**
     * @return {Boolean}
     */
    Transaction.prototype.isInTransaction = function () {
        return this.inTransaction;
    };
    /**
     * rollback
     * @return {Object}
     */
    Transaction.prototype.rollback = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.connection.rollback(function (err) {
                if (err)
                    return reject(err);
                if (_this.connection && _this.connection.release) {
                    _this.connection.release();
                }
                _this.inTransaction = false;
                _this.mysqlDebug.print('ROLLBACK');
                resolve(true);
            });
        });
    };
    return Transaction;
}());
Mysql.DEBUG_ON = 1;
Mysql.DEBUG_OFF = 2;
Mysql.DEBUG_CONSOLE = 1;
Mysql.DEBUG_FILE = 2;
Mysql.Model = Model;
exports["default"] = Mysql;
