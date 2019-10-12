module.exports = {
    isDebug: true,
    projectPath: "",
    applicationPath: "app",
    useCookie: false,
    cookie: {
        keys: ["okgoes"]
    },
    defaultController: "index",
    defaultAction: "index",
    port: 8001,
    isUseSession: false,
    session: {
        rolling: true,
        maxAge: 1800,
        key: "okgoes",
        overwrite: true,
        httpOnly:  true,
        signed: true,
        rolling: false,
        renew: false
    },
    isAllowCors: false,
    cors: {
        origin: "*",
        method: "GET,HEAD,PUT,POST,DELETE",
    },
    postBody: {
        jsonLimit: "1mb",
        formLimit: "2mb",
        textLimit: "2mb",
        multipart: true
    },
    static: {
        maxAge: 1800,
        extensions: true,
        viewExt: "html",
        cache: true,
        debug: true,
        rootPath: "/public/static",
        renderPath: "/app/views",
        layoutPath: "/template",
    },
    server: "Okgoes",
}