const Exception = require('../Exception');
const fs = require('fs');
const path = require('path');
class ControllerException extends Exception {
    constructor(message, code, type) {
        super(message, code);
        this.type = type || null;
        this.message = message;
    }

    html() {
        let html = '';
        switch(this.type) {
            case 'c1':
                html = fs.readFileSync(__dirname + '/exception/none_controller.html');
                html = html.toString().replace('<%controller%>', this.message);
                html = html.replace('<%stack%>', this.stack.replace(/\n/g, '<br>'));
                break;
            case 'c2':
                html = fs.readFileSync(__dirname + '/exception/none_action.html');
                html = html.toString().replace('<%action%>', this.message);
                html = html.replace('<%stack%>', this.stack.replace(/\n/g, '<br>'));
                break;
            default :
                html = fs.readFileSync(path.dirname(__dirname) + '/exception/default.html');
                html = html.toString().replace('<%stack%>', this.stack.replace(/\</, '&lt;').replace(/\>/, '&gt;').replace(/\n/g, '<br>'));
        }
        return html;
    }
}

ControllerException.NONE_CONTROLLER = '控制器不存在';
ControllerException.NONE_CONTROLLER_TYPE = 'c1';
ControllerException.NONE_CONTROLLER_CODE = 500;
ControllerException.NODE_ACTION = '控制器方法不存在';
ControllerException.NONE_ACTION_TYPE = 'c2';
ControllerException.NODE_ACTION_CODE = 500;
module.exports = ControllerException;