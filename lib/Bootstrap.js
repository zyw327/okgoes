const Request = require('./Request');
const Response = require('./Response');
const View = require('./View');
const Cookie = require('./Cookie');
const Session = require('./Session');
const ControllerException = require('./controller/Exception');

const fs = require('fs');
/**
 * bootstrap and export class 
 */
module.exports = class Bootstrap {
    /**
     * 
     * @param {Object} ctx 
     * @param {Function} next 
     * @api public
     */
    constructor(ctx, next) {
        this.request = new Request(ctx.request, new Cookie(ctx.cookies), new Session(ctx.seesion));
        this.response = new Response(ctx.response, new View(ctx), new Cookie(ctx.cookies));
    }
    /**
     * run
     * @api public
     */
    async run() {
        try {
            let controller = this.request.getController();
            let action = this.request.getAction();
            let controllerPath = global.APPLICATION_PATH + '/controller/' + controller + "Controller";
            if (!fs.existsSync(controllerPath + '.js')) {
                throw new ControllerException(controller + "Controller", ControllerException.NONE_CONTROLLER_CODE, ControllerException.NONE_CONTROLLER_TYPE);
            }
            let Controller = require(controllerPath);
            controller = new Controller(this.request, this.response);
            controller.request = this.request;
            controller.response = this.response;
            if (typeof(controller._init) === 'function' && (controller._init.call(this).toString() === '[object Promise]' && !(await controller._init()) || !controller._init())) {
                throw new ControllerException(controller, ControllerException.PERMISSION_DENIED_CODE, ControllerException.PERMISSION_DENIED_TYPE);
            }
            if (typeof(controller[action]) !== 'function') {
                throw new ControllerException(action, ControllerException.NODE_ACTION_CODE, ControllerException.NONE_ACTION_TYPE);
            }
            await controller[action]();
        } catch (error) {
            this.response.setStatus(typeof(error.code) == 'number' && error.code < 601 ? error.code : 500);
            if (!error.html || typeof(error.html) !== 'function') {
                error = new ControllerException(error.message, 500);
            }
            this.response.setBody(error.html());
            this.response.setType('html');
            console.error(error);
        }
    }
}
