/**
 * cookie and export class
 */
module.exports = class Cookie {
    /**
     * 
     * @param {Object} cookie 
     * @api public
     */
    constructor(cookie) {
        this.cookie = cookie;
        this.maxAge = 86400 * 30 * 1000 + Date.now();
        this.signed = true;
        this.expires = new Date(86400 * 30 * 1000 + Date.now() * 1000);
        this.path = '/';
        this.domain = '';
        this.secure = '';
        this.httpOnly = true;
        this.overwrite = true;
    }
    /**
     * 设置cookie
     * @param {String} key
     * @param {String} value
     * @return {Object}
     * @api public
     */
    setCookie(key, value) {
        return this.cookie.set(key, value, {signed: true, maxAge: this.maxAge, expires: this.expires});
    }

    /**
     * 获取Cookie
     * @param {String} key
     * @return {Object}
     * @api public
     */
    getCookie(key) {
        return this.cookie.get(key, {signed: true});
    }
}
