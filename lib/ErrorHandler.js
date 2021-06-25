const fs = require("fs");

class ErrorHandler {
    constructor(options, header, controller, response) {
        this.options = options;
        this.header = header;
        this.controller = controller;
        this.response = response;
    }

    isSetErrorHandler() {
        let controllerPath = global.APPLICATION_PATH + '/controller/ErrorController';
        if (!fs.existsSync(controllerPath + '.js')) {
            return false;
        }
        return true;
    }

    render500() {
        if (!this.options.isDebug && (this.controller.getController() != '' && this.controller.getController() && this.controller.getController().toLowerCase() != 'error' && this.controller.getAction != '_500')) {
            return this.response.redirect('/error/render500');
        }
    }

    render404(error) {
        if (!this.options.isDebug && (error.type == 'NO_CONTROLLER' || error.type == 'NO_ACTION') && (this.controller.getController() != '' && this.controller.getController() && this.controller.getController().toLowerCase() != 'error' && this.controller.getAction != '_404')) {
            return this.response.redirect('/error/render404');
        }
    }

    async handler(error) {
        console.error(error);
        if (this.isSetErrorHandler()) {
            this.render404();
            this.render500();
        }
        this.response.setStatus(typeof(error.code) == 'number' && error.code < 601 ? error.code : 500);
        if (!error.html || typeof(error.html) !== 'function') {
            error = new ControllerException(error.message, 500);
        }
        this.response.setBody(error.html());
        this.response.setType('html');
    }
}

module.exports = ErrorHandler;