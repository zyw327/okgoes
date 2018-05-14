const Request = require('../Request');
const Response = require('../Response');
class Action {
    /**
     * 
     * @param {Request} request 
     * @param {Response} response 
     */
    constructor(request, response) {
        this.view = null;
        this.isRender = true;
        this.request = request;
        this.response = response;
    }

    async _init() {
        return true;
    }

    async isPost() {
        return (this.request.getMethod()).toString().UpperCase() === 'post' ? true : false;
    }

    async renderHtml(path, params) {
        if (!path || typeof(path) !== 'string') {
            params = path;
            path = '/' + this.request.getController().toLocaleLowerCase() + '/' + this.request.getAction();
        }
        await this.response.render(path, params);
    }

    async renderJson(data) {
        await this.response.setBody(data);
    }
}

module.exports = Action;