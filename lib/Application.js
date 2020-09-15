const Koa = require('koa');
const app = new Koa();
const router = require('koa-router')();
const session = require('koa-session');
const koaBody = require('koa-body');
const path = require('path');
const cors = require('koa-cors');
const render = require('./view/render');
const koaStatic = require('koa-static');
const convert = require('koa-convert');

const Bootstrap = require('./Bootstrap');
const ApplicationDebug = require('./application/Debug');
/**
 * 
 */
module.exports = class Application {
    /**
     * @api public 
     */
    constructor() {
        this.isAllowCors = false;
        this.isAllowFileUpload = true;
        this.maxAge = 86400;
        this.renderPath = global.PROJECT_PATH + '/app/views';
        this.layoutPath = '/template';
        this.staticPath = global.PROJECT_PATH + '/public/static';
        this.viewExt = 'html';
        this.isCache = false;
        this.origin = '*';
        this.methods = 'GET,HEAD,PUT,POST,DELETE';
        this.isUseCookie = true;
        this.applicationDebug = new ApplicationDebug(true, 2);
        this.formLimit = "61kb";
        this.jsonLimit = "61kb";
        this.textLimit = "61kb";
        this.options = {
            defaultIndex: "index",
            defaultController: "index",
            isDebug: false,
            isViewDebug: false
        };
    }

    /**
     * 开启跨域
     * @api public
     */
    allowCors() {
        this.isAllowCors = true;
    }

    /**
     * 文件上传权限
     * @param {Boolean} config
     * @api public
     */
    allowFileUpload(config) {
        this.isAllowFileUpload = config || true;
    }

    /**
     * 设置静态文件的缓存时间
     * @param {Number} times
     * @api public
     */
    setMaxAge(times) {
        this.maxAge = times || 86400;
    }

    /**
     * 设置静态文件目录
     * @param {String} path
     * @api public
     */
    setRenderPath(path) {
        this.renderPath = path || this.renderPath;
    }

    /**
     * 设置布局文件所在文件夹
     * @param {String} path
     * @api public
     */
    setLayoutPath(path) {
        this.layoutPath = path || this.layoutPath;
    }

    /**
     * 设置渲染文件后缀
     * @param {String} ext
     * @api public
     */
    setViewExt(ext) {
        this.viewExt = ext;
    }

    /**
     * 设置是否缓存
     * @param {Boolean} isCache
     * @api public
     */
    setIsCache(isCache) {
        this.isCache = isCache || false;
    }

    /**
     * 设置是否开启调试模式
     * @param {Boolean} isDebug
     * @api public
     */
    setIsDebug(isDebug) {
        this.options.isDebug = isDebug || false;
    }

    /**
     * 设置是否开启视图调试模式
     * @param {Boolean} isDebug
     * @api public
     */
    setIsViewDebug(isDebug) {
        this.options.isViewDebug = isDebug || false;
    }

    /**
     * 设置静态资源位置
     * @param {String} staticPath
     * @api public
     */
    setStaticPath(staticPath) {
        this.staticPath = staticPath || this.staticPath;
    }

    /**
     * 设置跨域来源
     * @param {Mixed} origin
     * @api public
     */
    setCorsOrigin(origin) {
        this.allowCors();
        this.origin = origin || '*';
    }

    /**
     * 设置跨域允许的请求方式
     * @param {Mixed} methods
     * @api public
     */
    setCorsMethods(methods) {
        this.allowCors();
        this.methods = methods || this.methods;
    }

    /**
     * 是否开启cookie
     * @param {Boolean} isUseCookie
     * @api public
     */
    setUseCookie(isUseCookie) {
        app.keys = ["abcdefg"];
        this.isUseCookie = isUseCookie || true;
    }

    /**
     * 开启session
     * @param {Object} options
     * @api public
     */
    setSession(options) {
        this.setUseCookie(true);
        options = options || {};
        app.use(session({
            key: 'ns:psid',
            maxAge: parseInt(options.maxAge || 1800) * 1000,
            overwrite: options.overwrite || true,
            httpOnly: options.httpOnly || true,
            signed: options.signed || true,
            rolling: options.rolling || false,
            renew: options.rolling || false
        }, app));
    }

    /**
     * 设置默认action
     * @param {*} index 
     */
    setDefaultIndex(index) {
        if (!index || index == '' || index.length < 1 || /^\s+$/.test(index)) {
            return ;
        }
        index.replace(/^\s+$/g, '');
        this.options.defaultIndex = index;
    }

    /**
     * 设置默认controller
     * @param {*} controller 
     */
    setDefaultController(controller) {
        if (!controller || controller == '' || controller.length < 1 || /^\s+$/.test(controller)) {
            return ;
        }
        controller.replace(/^\s+$/g, '');
        this.options.defaultController = controller;
    }
    /**
     * 设置服务器端接收body大小
     * @param {String} bodySize 
     */
    setBodySize(bodySize) {
        this.jsonLimit = bodySize;
        this.textLimit = bodySize;
        this.formLimit = bodySize;
    }

    /**
     * listen port
     * @param Number port 
     * @api public
     */
    listen(port) {
        port = port || 3000;
        this.applicationDebug.setDebugPath(global.PROJECT_PATH + '/data/request');
        app.use(async (ctx, next) => {
            const start = Date.now();
            await next();
            const ms = Date.now() - start;
            // console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
            this.applicationDebug.print(ctx.url, ctx.method, ctx.query, ctx.request.body, ms +'ms');
        });

        app.on('error', (err, ctx) =>{
                console.log(err);
            }
        );

        if (this.isAllowCors) {
            app.use(convert(cors({
                origin: this.origin,
                methods: this.methods
            })));
        }
        app.use(koaBody({multipart: this.isAllowFileUpload, jsonLimit: this.jsonLimit, formLimit: this.formLimit, textLimit: this.textLimit}));
        app.use(koaStatic(this.staticPath, {
            maxAge: this.maxAge, 
            extensions: true
        }));
        render(app, {
            root: this.renderPath,
            layout: this.layoutPath,
            viewExt: this.viewExt,
            cache: this.isCache,
            debug: this.options.isViewDebug
        });
        let options = this.options;
        router.all('/*', async function(ctx, next) {
            let bootstrap = new Bootstrap(ctx, next);
            await bootstrap.run(options);
        });
        app.use(router.routes());
        app.listen(port);
        console.info("run at http://localhost:" + port);
        console.info("run at http://127.0.0.1:" + port);
    }
}
