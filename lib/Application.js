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

class Application {
    constructor() {
        this.isAllowCors = false;
        this.isAllowFileUpload = true;
        this.maxAge = 86400;
        this.renderPath = global.PROJECT_PATH + '/app/views';
        this.layoutPath = '/template';
        this.staticPath = global.PROJECT_PATH + '/public/static';
        this.viewExt = 'html';
        this.isCache = false;
        this.isDebug = false;
        this.origin = '*';
        this.methods = 'GET,HEAD,PUT,POST,DELETE';
        this.isUseCookie = true;
        this.applicationDebug = new ApplicationDebug(true, 2);
    }

    /**
     * 开启跨域
     */
    allowCors() {
        this.isAllowCors = true;
    }

    /**
     * 文件上传权限
     */
    allowFileUpload(config) {
        this.isAllowFileUpload = config || true;
    }

    /**
     * 设置静态文件的缓存时间
     */
    setMaxAge(times) {
        this.maxAge = times || 86400;
    }

    /**
     * 设置静态文件目录
     */
    setRenderPath(path) {
        this.renderPath = path || this.renderPath;
    }

    /**
     * 设置布局文件所在文件夹
     */
    setLayoutPath(path) {
        this.layoutPath = path || this.layoutPath;
    }

    /**
     * 设置渲染文件后缀
     */
    setViewExt(ext) {
        this.viewExt = ext;
    }

    /**
     * 设置是否缓存
     */
    setIsCache(isCache) {
        this.isCache = isCache || false;
    }

    /**
     * 设置是否开启调试模式
     */
    setIsDebug(isDebug) {
        this.isDebug = isDebug || false;
    }

    /**
     * 设置静态资源位置
     */
    setStaticPath(staticPath) {
        this.staticPath = staticPath || this.staticPath;
    }

    /**
     * 设置跨域来源
     */
    setCorsOrigin(origin) {
        this.allowCors();
        this.origin = origin || '*';
    }

    /**
     * 设置跨域允许的请求方式
     */
    setCorsMethods(methods) {
        this.allowCors();
        this.methods = methods || this.methods;
    }

    /**
     * 是否开启cookie
     */
    setUseCookie(isUseCookie) {
        app.keys = ["abcdefg"];
        this.isUseCookie = isUseCookie || true;
    }

    /**
     * 开启session
     */
    setSession(options) {
        this.setUseCookie(true);
        app.use(session({
            key: 'ns:psid',
            maxAge: 1800,
            overwrite: true,
            httpOnly: true,
            signed: true,
            rolling: false, 
        }, app));
    }

    /**
     * 
     * @param Number port 
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
        app.use(koaBody({multipart: this.isAllowFileUpload}));
        app.use(koaStatic(this.staticPath, {
            maxAge: this.maxAge, 
            extensions: true
        }));
        render(app, {
            root: this.renderPath,
            layout: this.layoutPath,
            viewExt: this.viewExt,
            cache: this.isCache,
            debug: this.isDebug
        });
        router.all('/*', async function(ctx, next) {
            let bootstrap = new Bootstrap(ctx, next);
            await bootstrap.run();
        });
        app.use(router.routes());
        app.listen(port);
        console.info("run at http://localhost:" + port);
        console.info("run at http://127.0.0.1:" + port);
    }
}

module.exports = Application;