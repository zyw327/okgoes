const Koa = require('koa');
const app = new Koa();
const router = require('koa-router')();
const session = require('koa-session');
const koaBody = require('koa-body');
const cors = require('koa-cors');
const render = require('./view/render');
const koaStatic = require('koa-static');
const convert = require('koa-convert');
const Bootstrap = require('./Bootstrap');
const path = require("path");

app.use(async (ctx, next) => {
    const start = Date.now();
    await next();
    const ms = Date.now() - start;
    console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
});

app.on('error', (err, ctx) =>{
        ctx.append("server", "okgoes");
        console.log(err);
    }
);

/**
 * 设置cookie
 * @param {*} app 
 * @param {*} defaultConfig 
 */
function useCookie(app, defaultConfig) {
    app.keys = defaultConfig.cookie.keys;
}

/**
 * 设置跨域
 * @param {*} app 
 * @param {*} defaultConfig 
 */
function useCors(app, defaultConfig) {
    if (defaultConfig.isAllowCors) {
        app.use(convert(cors({
            origin: defaultConfig.cors.origin,
            methods: defaultConfig.cors.method
        })));
    }
}

/**
 * 设置session
 * @param {*} app 
 * @param {*} defaultConfig 
 */
function useSession(app, defaultConfig) {
    if (defaultConfig.isUseSession) {
        app.use(session({
            key: defaultConfig.session.key,
            maxAge: defaultConfig.session.maxAge,
            overwrite: defaultConfig.session.overwrite,
            httpOnly: defaultConfig.session.httpOnly,
            signed: defaultConfig.session.signed,
            rolling: defaultConfig.session.rolling,
            renew: defaultConfig.session.renew
        }, app));
    }
}
 
/**
 * 设置body解析
 * @param {*} app 
 * @param {*} defaultConfig 
 */
function bodySetting(app, defaultConfig) {
    app.use(koaBody({
        multipart: defaultConfig.postBody.multipart,
        jsonLimit: defaultConfig.postBody.jsonLimit, 
        formLimit: defaultConfig.postBody.formLimit, 
        textLimit: defaultConfig.postBody.textLimit
    }));
}        

/**
 * 配置静态资源
 * @param {*} app 
 * @param {*} defaultConfig 
 */
function setStaticReource(app, defaultConfig) {
    app.use(koaStatic(defaultConfig.projectPath + defaultConfig.static.rootPath, {
        maxAge: defaultConfig.static.maxAge, 
        extensions: defaultConfig.static.extensions
    }));
}

/**
 * 视图渲染配置
 * @param {*} app 
 * @param {*} defaultConfig 
 */
function viewRenderSetting(app, defaultConfig) {
    render(app, {
        root: defaultConfig.projectPath + defaultConfig.static.renderPath,
        layout: defaultConfig.static.layoutPath,
        viewExt: defaultConfig.static.viewExt,
        cache: defaultConfig.static.cache,
        debug: defaultConfig.static.debug
    });
}

/**
 * 路由配置
 * @param {*} defaultConfig 
 */
function routerSetting(defaultConfig) {
    router.all('/*', async (ctx, next) => {
        ctx.append("server", "okgoes");
        console.log(ctx.header);
        let bootstrap = new Bootstrap(ctx, next);
        await bootstrap.run(defaultConfig);
    });
}

/**
 * 
 */
module.exports = class Application {
    /**
     * @api public 
     */
    constructor() {
        if (!global.PROJECT_PATH) {
            global.PROJECT_PATH = path.dirname(path.dirname(__dirname));
        }
        if (global.PROJECT_PATH && global.PROJECT_PATH.length && global.PROJECT_PATH[global.PROJECT_PATH.length - 1] == "/") {
            global.PROJECT_PATH = global.PROJECT_PATH.substr(0, global.PROJECT_PATH.length - 1);
        }
        this.defaultConfig = require("./Config");
        this.defaultConfig.projectPath = global.PROJECT_PATH;
        this.defaultConfig.applicationPath = this.defaultConfig.projectPath + "/app";
    }

    /**
     * 覆盖配置，设置之后默认配置被覆盖
     * @param {Object} config 
     */
    setConfig(config) {
        this.defaultConfig = config;
    }

    /**
     * 获取设置的配置或默认配置
     */
    getConfig() {
        return this.defaultConfig;
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
        this.defaultConfig.defaultAction = index;
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
        this.defaultConfig.defaultController = controller;
    }

    /**
     * 开启调试模式
     * @param {Boolean} isDebug 
     */
    setIsDebug(isDebug) {
        this.defaultConfig.isDebug = isDebug;
    }

    /**
     * 设置session配置
     * @param {Object} options 
     */
    setSession(options) {
        this.defaultConfig.session.rolling = options.rolling || this.defaultConfig.session.rolling;
        this.defaultConfig.session.maxAge = options.maxAge || this.defaultConfig.session.maxAge;
    }

    /**
     * 设置是否使用cookie
     * @param {Boolean} isUseCookie 
     */
    setUseCookie(isUseCookie) {
        this.defaultConfig.isUseCookie = isUseCookie;
    }

    /**
     * 开启视图调试模式
     * @param {Boolean} isDebug 
     */
    setIsViewDebug(isDebug) {
        this.defaultConfig.static.debug = isDebug;
    }
    /**
     * listen port
     * @param Number port 
     * @api public
     */
    listen() {
        bodySetting(app, this.defaultConfig);
        useCookie(app, this.defaultConfig);
        useSession(app, this.defaultConfig);
        useCors(app, this.defaultConfig);
        setStaticReource(app, this.defaultConfig);
        viewRenderSetting(app, this.defaultConfig);
        routerSetting(this.defaultConfig);
        app.use(router.routes());
        app.listen(this.defaultConfig.port);
        console.info("run at http://localhost:" + this.defaultConfig.port);
        console.info("run at http://127.0.0.1:" + this.defaultConfig.port);
    }
}
