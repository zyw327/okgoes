const redis = require('redis');
/**
 * redis操作
 */
class Redis {
    /**
     * 构造函数
     * @param {Object} config
     */
    constructor(config) {
        this.client = this.createClient(config);
        this.client.on('connect', (err) => {
            if (err) {
                console.log(err);
            }
        });
    }

    /**
     * 创建一个redis客户端
     * @param {Object} config
     * @return {Object}
     */
    createClient(config) {
        return redis.createClient(config);
    }

    /**
     * 数据库选择
     * @param {Number} num
     * @return {Object}
     */
    select(num) {
        return new Promise((resolve, reject) => {
            this.client.select(num, (err) => {
                if (err) {
                    return reject(err);
                }
                resolve(true);
            });
        });
    }
    auth(password) {
        return new Promise((resolve, reject) => {
            this.client.auth(password, () => {

            });
        });
    }
    /**
     * 设置key
     * @param {String} key
     * @param {String} value
     * @param {Number} expire
     * @return {Promise}
     */
    set(key, value, expire) {
        expire = expire || 0;
        return new Promise((resolve, reject) => {
            let result = [];
            this.client.set(key, value, (err, value) => {
                if (err) {
                    return reject(err);
                }
                result['value'] = value;
            });
            if (expire) {
                this.client.expire(key, expire, (err) => {
                    if (err) {
                        return reject(err);
                    }
                });
            }
        });
    }

    /**
     * 获取value
     * @param {String} key
     * @return {String}
     */
    get(key) {
        return new Promise((resolve, reject) => {
            this.client.get(key, (err, value) => {
                if (err) {
                    return reject(err);
                }
                resolve(value);
            });
        });
    }

    /**
     * 删除键
     * @param {String} key
     * @return {Promise}
     */
    del(key) {
        return new Promsie((resolve, reject) => {
            this.client.del(key, (err) => {
                if (err) {
                    return reject(err);
                }
                resolve(true);
            });
        });
    }

    /**
     * 序列化键
     * @param {String} key
     * @return {Promise}
     */
    dump(key) {
        return new Promsie((resolve, reject)=>{
            this.client.dump(key, (err, value) => {
                if (err) {
                    return reject(err);
                }
                resolve(value);
            });
        });
    }

    /**
     * 判断键是否存在
     * @param {String} key
     * @return {Promsie}
     */
    exists(key) {
        return new Promise((resolve, reject) => {
            this.client.exists(key, (err, exists) => {
                if (err) {
                    return reject(err);
                }
                resolve(exists);
            });
        });
    }

    /**
     * 更新生存时间
     * @param {String} key
     * @param {Number} seconds
     * @return {Promise}
     */
    expire(key, seconds) {
        return new Promise((resolve, reject)=>{
            this.client.expire(key, seconds, (err) => {
                if (err) {
                    return reject(err);
                }
                resolve(true);
            });
        });
    }
    /**
     * 设置过期时间
     * @param {String} key
     * @param {Number} timestamp
     * @return {Promise}
     */
    expireat(key, timestamp) {
        return new Promise((resolve, reject) => {
            this.client.expireat(key, timestamp, (err) => {
                if (err) {
                    return reject(err);
                }
                resolve(true);
            });
        });
    }
    /**
     * 正则查找键
     * @param {String} pattern
     * @return {Promise}
     */
    keys(pattern) {
        return new Promise((resolve, reject) => {
            this.client.keys(pattern, (err, result) => {
                if (err) {
                    return reject(err);
                }
                resolve(result);
            });
        });
    }
}
module.exports = Redis;
