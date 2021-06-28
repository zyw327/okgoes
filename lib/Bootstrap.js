const Request = require('./Request');
const Response = require('./Response');
const View = require('./View');
const Cookie = require('./Cookie');
const Session = require('./Session');
const Controller = require('./Controller');
const Header = require('./Header');
const ErrorHandle = require('./ErrorHandle');
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
        this.session = new Session(ctx.session);
        this.request = new Request(ctx.request, new Cookie(ctx.cookies), new Session(this.session), ctx);
        this.response = new Response(ctx.response, new View(ctx), new Cookie(ctx.cookies));
        this.header = new Header(ctx);
        this.cookies = new Cookie(ctx.cookies);
    }
    /**
     * run
     * @api public
     */
    async run(options) {
        this.request.setOptions(options);
        const context = {
            request: this.request, 
            response: this.response, 
            session: this.session,
            cookies: this.cookies,
            header: this.header
        };
        const controller = new Controller(context);
        try {
            await controller.runAction(this.request, this.response);
        } catch (error) {
            const errorHandle = new ErrorHandle(options, controller, context);
            await errorHandle.handle(error);
        }
    }
}
