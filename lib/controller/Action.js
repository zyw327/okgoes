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
     * @param {Session} session
     * @api public
     */
    constructor(context) {
        const {request, response, session} = context;
        this.request = request;
        this.response = response;
        this.session = session;
    }
    /**
     * init
     * @return {Boolean}
     * @api private
     */
    async _init() {
        return false;
    }
    /**
     * isPost
     * @return {Boolean}
     * @api public
     */
    isPost() {
        return (this.request.getMethod()).toString().toLowerCase() === 'post' ? true : false;
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
