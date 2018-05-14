const View = require('./View');
const Cookie = require('./Cookie');
/**
 * 响应
 */
class Response {
    /**
     * 构造函数初始化
     * @param {Object} res
     * @param {View} view
     * @param {Cookie} cookie
     */
    constructor(response, view, cookie) {
        this.response = response;
        this.view = view;
        this.cookie = cookie;
    }

    setBody(content) {
        this.response.body = content;
    }

    setStatus(status) {
        this.response.status = status;
    }

    setType(type) {
        this.response.type = type;
    }

    async render(path, params) {
        await this.view.render(path, params);
    }

    redirect(url) {
        this.response.redirect(url);
    }
}

module.exports = Response;
