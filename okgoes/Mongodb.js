const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId;
var dbm = null;
class Mongodb {
    constructor(collection) {
        this.collection = collection;
    }
    async getDb (mongodbConfig) {
        let uri = "mongodb://" + mongodbConfig.user + ":" + encodeURIComponent(mongodbConfig.password) + "@" + mongodbConfig.host + ":" + mongodbConfig.port + "/" + mongodbConfig.database;
        return new Promise((resolve, reject) => {
            if (!dbm) {
                MongoClient.connect(uri, (err, db) => {
                    if (err) {
                        return reject(err);
                    }
                    dbm = db.db(mongodbConfig.database);
                    resolve(dbm);
                });
            } else {
                resolve(dbm);
            }
        });
    }
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

    async update(collection, where, data) {
        collection = this.collection || collection;
        let db = await this.getDb();
        return new Promise((resolve, reject) => {
            db.collection(collection).updateMany(where, data, (err, result) => {
                if (err) {
                    return reject(err);
                }
                resolve(result);
            });
        });
    }

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

    objectId(id) {
        try {
            return ObjectId(id);
        } catch (error) {
            return false;
        }
    }
}

module.exports = Mongodb;