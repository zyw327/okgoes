const Okgoes = require('okgoes');

const path = require('path');
global.PROJECT_PATH = __dirname;
global.APPLICATION_PATH = global.PROJECT_PATH + '/app';

let app = new Okgoes.Application();
app.setIsDebug(true);
app.setUseCookie(true);
app.listen(3002);