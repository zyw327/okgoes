const fs = require("fs");
const ControllerException = require('./controller/Exception');
const ErrorAction = require("./exception/ErrorAction");
const Exception = require("./Exception");
class ErrorHandle {
    constructor(options, controller, context) {
        this.options = options;
        this.context = context;
        this.controller = controller;
    }

    isSetErrorHandle() {
        let controllerPath = global.APPLICATION_PATH + '/controller/ErrorController';
        if (!fs.existsSync(controllerPath + '.js')) {
            return false;
        }
        return true;
    }

    async errorHandle(error) {
        let controllerPath = global.APPLICATION_PATH + '/controller/ErrorController';
        const ErrorController = require(controllerPath);
        const errorController = new ErrorController(this.context, error);
        if (!(errorController instanceof ErrorAction)) {
            return false;
        }
        if (!this.options.errorHandleAction || !errorController[this.options.errorHandleAction] || typeof(errorController[this.options.errorHandleAction]) !== 'function' ) {
            return false;
        }
        this.context.request.setAction(this.options.errorHandleAction);
        this.context.request.setController("Error");
        let errorAction = errorController[this.options.errorHandleAction].call(errorController);
        if (!errorAction) {
            return false;
        }
        if ((errorAction.toString() === '[object Promise]')) {
            await errorAction;
            return true;
        }
        errorController[this.options.errorHandleAction]();
        return true;
    }

    async handle(error) {
        console.error(error);
        if (!this.isSetErrorHandle()) {
            if (!error.html || typeof(error.html) !== 'function') {
                error = new ControllerException(error.message, 500);
            }
            this.context.response.setBody(error.html());
            this.context.response.setType('html');
            return ;
        }

        if (!(error instanceof ControllerException)) {
            error = new Exception(error.message, 500);
        }

        if (await this.errorHandle(error)) {
            this.context.response.setStatus(typeof(error.code) == 'number' && error.code < 601 ? error.code : 500);
            return ;
        }
        const errorAction = new ErrorAction(this.context, error);
        errorAction.trace();
    }
}

module.exports = ErrorHandle;