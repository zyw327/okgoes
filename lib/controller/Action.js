const Request = require('../Request');
const Response = require('../Response');
/**
 * controller action and export action
 */
module.exports = class Action {
    /**
     * 
     * @param {Request} request 
     * @param {Response} response
     * @api public
     */
    constructor(request, response) {
        this.view = null;
        this.isRender = true;
        this.request = request;
        this.response = response;
    }
    /**
     * init
     * @return {Boolean}
     * @api private
     */
    async _init() {
        return true;
    }
    /**
     * isPost
     * @return {Boolean}
     * @api public
     */
    async isPost() {
        return (this.request.getMethod()).toString().UpperCase() === 'post' ? true : false;
    }
    /**
     * render html
     * @param {String} path 
     * @param {Object} params 
     */
    async renderHtml(path, params) {
        if (!path || typeof(path) !== 'string') {
            params = path;
            path = '/' + this.request.getController().toLocaleLowerCase() + '/' + this.request.getAction();
        }
        await this.response.render(path, params);
    }
    /**
     * render json
     * @param {Object} data 
     */
    async renderJson(data) {
        await this.response.setBody(data);
    }
}
