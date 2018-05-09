// const Application = require('./index').Application;
// const path = require('path');
// global.PROJECT_PATH = __dirname;
// global.APPLICATION_PATH = global.PROJECT_PATH + '/app';

// let app = new Application();
// // app.setIsDebug(true);
// app.setUseCookie(true);
// app.listen(3002);
const Build = require('./okgoes/Build');
let build = new Build();
build.build(__dirname);