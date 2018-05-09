const Okgoes = require('okgoes');

const path = require('path');
global.PROJECT_PATH = path.dirname(__dirname);
global.APPLICATION_PATH = global.PROJECT_PATH + '/app';

let app = new Okgoes.Application();
app.setIsDebug(false);
app.setUseCookie(true);
app.listen(3002);