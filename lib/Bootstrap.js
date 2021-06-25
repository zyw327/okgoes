const Request = require('./Request');
const Response = require('./Response');
const View = require('./View');
const Cookie = require('./Cookie');
const Session = require('./Session');
const ControllerException = require('./controller/Exception');
const Controller = require('./Controller');
const Header = require('./Header');
const ErrorHandler = require('./ErrorHandler');
/**
 * bootstrap and export class 
 */
module.exports = class Bootstrap {
    /**
     * 
     * @param {Object} ctx 
     * @api public
     */
    constructor(ctx) {
        this.request = new Request(ctx.request, new Cookie(ctx.cookies), new Session(ctx.session), ctx);
        this.response = new Response(ctx.response, new View(ctx), new Cookie(ctx.cookies));
        this.header = new Header(ctx);
    }
    /**
     * run
     * @api public
     */
    async run(options) {
        this.request.setOptions(options);
        const controller = new Controller(this.request, this.response);
        try {
            await controller.runAction(this.request, this.response);
        } catch (error) {
            const errorHandler = new ErrorHandler(options, this.header, controller, this.response);
            await errorHandler.handler(error);
        }
    }
}
