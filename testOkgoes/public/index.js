const Okgoes = require('../../index');
const path = require('path');
// 设置项目根路径
global.PROJECT_PATH = path.dirname(__dirname);
//设置controller、model、views目录的上一级目录位置
global.APPLICATION_PATH = global.PROJECT_PATH + '/app';
// 创建应用实例
let app = new Okgoes.Application();
// 开启视图调试模式
app.setIsDebug(false);
// 开启cookie
app.setUseCookie(true);
app.setDefaultIndex("json");
// 监听端口
let callback = async function(ctx) {
    let host = ctx.request.host;

    const domians = {
        "zyw.blog.com": 1,
        "localhost":2,
        "127.0.0.1":3
    };

    if (!host) {
        host = "localhost";
    }
    host = host.split(":");
    // console.log(host);

    // console.log(domians[host[0]]);
    global.CONFIG = require('../app/configs/config' + domians[host[0]]);
    global.CONFIG.domian = host;
};
app.listen(3002, callback);