const UrlParse = require('./url/parse');
/**
 * Request
 */
class Request {
    /**
     * 构造函数初始化
     * @param {Object} req
     */
    constructor(request, cookie) {
        this.request = request;
        this.urlParse = new UrlParse(this.getUrl());
        this.isUseModule = false;
        this.cookie = cookie;
    }
    /**
     * 
     * @param {String} param 
     */
    toFirstUpper(param) {
        let first = param.substr(0, 1);
        let last = param.substr(1);
        return first.toUpperCase() + last;
    }

    setUseModule(isUseModule) {
        this.isUseModule = isUseModule || false;
    }

    getIp() {
        return this.request.ip;
    }

    getUrl() {
        return this.request.url;
    }

    getMethod() {
        return this.request.method;
    }

    getHeader() {
        return this.request.header;
    }

    /**
     * 获取post类请求参数
     */
    getPost(name) {
        if (name) {
            return this.request.body[name];
        }
        return this.this.request.body;
    }

    getUrlPath() {
        return this.urlParse.getUrlPath();
    }

    /**
     * 获取get请求参数
     * @param {String} name
     */
    getQuery(name) {
        if (name) {
            return this.request.query[name];
        }
        return this.request.query;
    }
    
    /**
     * 获取所有参数
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

    getAction() {
        let urlPath = this.urlParse.getUrlPath();
        if (!this.isUseModule) {
            return urlPath.length > 1 ? urlPath[1] : "index";
        }
        return urlPath.length > 2 ? urlPath[2] : "index";
    }

    getController() {
        let urlPath = this.urlParse.getUrlPath();
        if (!this.isUseModule) {
            return urlPath.length ? this.toFirstUpper(urlPath[0]) : "Index";
        }
        return urlPath.length > 1 ? this.toFirstUpper(urlPath[1]) : "Index";
    }

    getModule() {
        if (!this.isUseModule) {
            return null;
        }
        let urlPath = this.urlParse.getUrlPath();
        return urlPath.length ? urlPath[0] : "index";
    }
}

module.exports = Request;