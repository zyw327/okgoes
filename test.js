const Application = require('./lib/Application');
const path = require('path');
// 设置项目根路径
global.PROJECT_PATH = path.dirname(__dirname);
//设置controller、model、views目录的上一级目录位置
global.APPLICATION_PATH = global.PROJECT_PATH + '/app';
// 创建应用实例
let app = new Application();
// 开启视图调试模式
app.setIsDebug(false);
// 开启cookie
app.setUseCookie(true);
app.setDefaultIndex("index");
// 监听端口
app.listen(3002);