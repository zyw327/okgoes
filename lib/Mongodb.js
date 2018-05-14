const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId;
var dbm = null;
/**
 * mongodb
 */
module.exports = class Mongodb {
    /**
     * 
     * @param {Object} options 
     */
    constructor(options) {
        this.options = options;
    }
    /**
     * get db
     * @return {Object}
     */
    async getDb () {
        let uri = "mongodb://" + this.options.user + ":" + encodeURIComponent(this.options.password) + "@" + this.options.host + ":" + this.options.port + "/" + this.options.database;
        return new Promise((resolve, reject) => {
            if (!dbm) {
                MongoClient.connect(uri, (err, db) => {
                    if (err) {
                        return reject(err);
                    }
                    dbm = db.db(this.options.database);
                    resolve(dbm);
                });
            } else {
                resolve(dbm);
            }
        });
    }
    /**
     * 
     * @param {String} collection 
     * @param {Object} where 
     * @param {Number} page 
     * @param {Number} pagesize 
     * @return {Object}
     */
    async find(collection, where, page, pagesize) {
        collection = this.collection || collection;
        let db = await this.getDb();
        return new Promise((resolve, reject) => {
            db.collection(collection).find(where).limit(pagesize).skip((page - 1) * pagesize).toArray((err, result) => {
                if (err) {
                    return reject(err);
                }
                resolve(result);
            });
        });
    }
    /**
     * 
     * @param {String} collection 
     * @param {Object} where 
     * @return {Object}
     */
    async findOne(collection, where) {
        collection = this.collection || collection;
        let db = await this.getDb();
        return new Promise((resolve, reject) => {
            db.collection(collection).findOne(where, (err, result) => {
                if (err) {
                    return reject(err);
                }
                resolve(result);
            });
        });
    }
    /**
     * 
     * @param {String} collection 
     * @param {Object} where 
     * @return {Object}
     */
    async count(collection, where) {
        collection = this.collection || collection;
        let db = await this.getDb();
        return new Promise((resolve, reject) => {
            db.collection(collection).count(where, (err, result) => {
                if (err) {
                    return reject(err);
                }
                resolve(result);
            });
        });
    }
    /**
     * 
     * @param {String} collection 
     * @param {Object} data 
     * @param {Object} where 
     * @return {Object}
     */
    async update(collection, data, where) {
        collection = this.collection || collection;
        let db = await this.getDb();
        return new Promise((resolve, reject) => {
            db.collection(collection).updateMany(where, {$set: data}, (err, result) => {
                if (err) {
                    return reject(err);
                }
                resolve(result);
            });
        });
    }
    /**
     * 
     * @param {String} collection 
     * @param {Object} data 
     * @return {Object}
     */
    async insert(collection, data) {
        collection = this.collection || collection;
        let db = await this.getDb();
        return new Promise((resolve, reject) => {
            db.collection(collection).insert(data, (err, result) => {
                if (err) {
                    return reject(err);
                }
                resolve(result);
            });
        });
    }
    /**
     * delete
     * @param {String} collection 
     * @param {Object} where 
     * @return {Object}
     */
    async delete(collection, where) {
        collection = this.collection || collection;
        let db = await this.getDb();
        return new Promise((resolve, reject) => {
            db.collection(collection).deleteMany(where, (err, result) => {
                if (err) {
                    return reject(err);
                }
                resolve(result);
            });
        });
    }
    /**
     * objectid
     * @param {String} id 
     * @return {Object}
     */
    objectId(id) {
        try {
            return ObjectId(id);
        } catch (error) {
            return false;
        }
    }
}
