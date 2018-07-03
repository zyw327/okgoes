const View = require('./View');
const Cookie = require('./Cookie');
/**
 * 响应
 */
module.exports = class Response {
    /**
     * 构造函数初始化
     * @param {Object} response
     * @param {View} view
     * @param {Cookie} cookie
     * @api public
     */
    constructor(response, view, cookie) {
        this.response = response;
        this.view = view;
        this.cookie = cookie;
    }
    /**
     * 
     * @param {String} content 
     * @api public
     */
    setBody(content) {
        this.response.body = content;
    }
    /**
     * 
     * @param {Number} status 
     * @api public
     */
    setStatus(status) {
        this.response.status = status;
    }
    /**
     * 
     * @param {String} type 
     * @api public
     */
    setType(type) {
        this.response.type = type;
    }
    /**
     * 
     * @param {String} path 
     * @param {Object} params
     * @api public 
     */
    async render(path, params) {
        await this.view.render(path, params);
    }
    /**
     * 
     * @param {String} url 
     * @api public
     */
    redirect(url) {
        this.response.redirect(url);
    }

    /**
     * @return {Object}
     * @api public
     */
    getHeader() {
        return this.response.header;
    }
}

