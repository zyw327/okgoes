const UrlParse = require('./url/parse');
/**
 * Request
 */
module.exports = class Request {
    /**
     * 构造函数初始化
     * @param {Object} request
     * @param {Object} cookie
     * @param {Object} session
     * @api public
     */
    constructor(request, cookie, session) {
        this.request = request;
        this.urlParse = new UrlParse(this.getUrl());
        this.isUseModule = false;
        this.cookie = cookie;
        this.session = session;
    }
    /**
     * 
     * @param {String} param 
     * @api public
     */
    toFirstUpper(param) {
        let first = param.substr(0, 1);
        let last = param.substr(1);
        return first.toUpperCase() + last;
    }
    /**
     * 
     * @param {Boolean} isUseModule 
     * @api public
     */
    setUseModule(isUseModule) {
        this.isUseModule = isUseModule || false;
    }
    /**
     * @return {String}
     * @api public
     */
    getIp() {
        return this.request.ip;
    }
    /**
     * @return {String}
     * @api public
     */
    getUrl() {
        return this.request.url;
    }
    /**
     * @return {String}
     * @api public
     */
    getMethod() {
        return this.request.method;
    }
    /**
     * @return {Object}
     * @api public
     */
    getHeader() {
        return this.request.header;
    }

    /**
     * 获取post类请求参数
     * @return {Object}
     * @api public
     */
    getPost(name) {
        if (name) {
            return this.request.body[name];
        }
        return this.request.body;
    }
    /**
     * @return {String}
     * @api public
     */
    getUrlPath() {
        return this.urlParse.getUrlPath();
    }

    /**
     * 获取get请求参数
     * @param {String} name
     * @return {Object}
     * @api public
     */
    getQuery(name) {
        if (name) {
            return this.request.query[name];
        }
        return this.request.query;
    }
    
    /**
     * 获取所有参数
     * @return {Object}
     * @api public
     */
    getAllParams(name) {
        let params = this.request.query;
        for (let i in this.request.body) {
            if (this.request.body.hasOwnProperty(i)) {
                params[i] = this.request.body[i];
            }
        }
        if (name) {
            return params[name];
        }
        return params;
    }
    /**
     * @return {String}
     * @api public
     */
    getAction() {
        let urlPath = this.urlParse.getUrlPath();
        if (!this.isUseModule) {
            return urlPath.length > 1 ? urlPath[1] : "index";
        }
        return urlPath.length > 2 ? urlPath[2] : "index";
    }
    /**
     * @return {String}
     * @api public
     */
    getController() {
        let urlPath = this.urlParse.getUrlPath();
        if (!this.isUseModule) {
            return urlPath.length ? this.toFirstUpper(urlPath[0]) : "Index";
        }
        return urlPath.length > 1 ? this.toFirstUpper(urlPath[1]) : "Index";
    }
    /**
     * @return {String}
     * @api public
     */
    getModule() {
        if (!this.isUseModule) {
            return null;
        }
        let urlPath = this.urlParse.getUrlPath();
        return urlPath.length ? urlPath[0] : "index";
    }
}
