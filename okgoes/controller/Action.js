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

    async render(path, params) {
        if (!path || typeof(path) !== 'string') {
            params = path;
            path = '/' + this.request.getController().toLocaleLowerCase() + '/' + this.request.getAction();
        }
        await this.response.render(path, params);
    }

    redirect(url) {
        this.response.redirect(url);
    }

    getResponse() {
        return this.response;
    }

    getRequest() {
        return this.request;
    }

    async json(data) {
        await this.response.setBody(data);
    }
}

module.exports = Action;