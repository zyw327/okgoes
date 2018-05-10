const Okgoes = require('okgoes');
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
// 监听端口
app.listen(3002);