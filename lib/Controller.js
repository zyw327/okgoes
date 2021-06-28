const fs = require("fs");
const ControllerException = require('./controller/Exception');

class Controller {
    constructor(context) {
        this.controller = context.request.getController();
        this.action = context.request.getAction();
        this.module = context.request.getModule();
        this.context = context;
    }

    getController() {
        return this.controller;
    }

    getAction() {
        return this.action;
    }

    getControllerPath() {
        let controllerPath = global.APPLICATION_PATH + '/controller/' + this.controller + "Controller";
        if (!fs.existsSync(controllerPath + '.js')) {
            return null;
        }
        return controllerPath;
    }

    async init(userController) {
        if (typeof(userController._init) === 'function') {
            let init = userController._init.call(this);
            if ((init.toString() === '[object Promise]' ? await init : init)) {
                return true;
            }
        }
        return false;
    }

    async runAction() {
        const controllerPath = this.getControllerPath();
        if (controllerPath == null) {
            throw new ControllerException(this.controller + "Controller", ControllerException.NONE_CONTROLLER_CODE, ControllerException.NONE_CONTROLLER_TYPE);
        }
        const UserController = require(this.getControllerPath());
        const userController = new UserController(this.context);
        if (await this.init(userController)) {
            return true;
        }
        if (typeof(userController[this.action]) !== 'function') {
            throw new ControllerException(this.action, ControllerException.NODE_ACTION_CODE, ControllerException.NONE_ACTION_TYPE);
        }
        await userController[this.action]();
    }
}

module.exports = Controller;