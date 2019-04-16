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
        this.request = new Request(ctx.request, new Cookie(ctx.cookies), new Session(ctx.session), ctx);
        this.response = new Response(ctx.response, new View(ctx), new Cookie(ctx.cookies));
    }
    /**
     * run
     * @api public
     */
    async run(options) {
        let controllerStr = "";
        let actionStr = '';
        try {
            this.request.setOptions(options);
            let controller = this.request.getController();
            let action = this.request.getAction();
            controllerStr = controller;
            actionStr = action;
            let controllerPath = global.APPLICATION_PATH + '/controller/' + controller + "Controller";
            if (!fs.existsSync(controllerPath + '.js')) {
                throw new ControllerException(controller + "Controller", ControllerException.NONE_CONTROLLER_CODE, ControllerException.NONE_CONTROLLER_TYPE);
            }
            let Controller = require(controllerPath);
            controller = new Controller(this.request, this.response);
            controller.request = this.request;
            controller.response = this.response;
            if (typeof(controller._init) === 'function') {
                let init = controller._init.call(this);
                if ((init.toString() === '[object Promise]' ? await init : init)) {
                    return true;
                }
            }
            if (typeof(controller[action]) !== 'function') {
                throw new ControllerException(action, ControllerException.NODE_ACTION_CODE, ControllerException.NONE_ACTION_TYPE);
            }
            await controller[action]();
        } catch (error) {
            console.error(error);
            if (!options.isDebug && (error.type == 'c1' || error.type == 'c2') && (controllerStr != '' && controllerStr && controllerStr.toLowerCase() != 'error' && actionStr != '_404')) {
                return this.response.redirect('/error/_404');
            }
            if (!options.isDebug && (controllerStr != '' && controllerStr && controllerStr.toLowerCase() != 'error' && actionStr != '_500')) {
                return this.response.redirect('/error/_500');
            }
            this.response.setStatus(typeof(error.code) == 'number' && error.code < 601 ? error.code : 500);
            if (!error.html || typeof(error.html) !== 'function') {
                error = new ControllerException(error.message, 500);
            }
            this.response.setBody(error.html());
            this.response.setType('html');
        }
    }
}
