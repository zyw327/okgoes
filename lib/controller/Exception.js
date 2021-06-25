const Exception = require('../Exception');
const fs = require('fs');
const path = require('path');
/**
 * controller exception
 */
class ControllerException extends Exception {
    /**
     * 
     * @param {String} message 
     * @param {Number} code 
     * @param {ControllerException} type 
     * @api public
     */
    constructor(message, code, type) {
        super(message, code);
        this.type = type || null;
        this.message = message;
    }
    /**
     * build html
     * @return {String}
     * @api public
     */
    html() {
        let html = '';
        switch(this.type) {
            case 'NO_CONTROLLER':
                html = fs.readFileSync(__dirname + '/exception/none_controller.html');
                html = html.toString().replace('<%controller%>', this.message);
                html = html.replace('<%stack%>', this.stack.replace(/\n/g, '<br>'));
                break;
            case 'NO_ACTION':
                html = fs.readFileSync(__dirname + '/exception/none_action.html');
                html = html.toString().replace('<%action%>', this.message);
                html = html.replace('<%stack%>', this.stack.replace(/\n/g, '<br>'));
                break;
            case 'NO_PERMISSION':
                html = fs.readFileSync(__dirname + '/exception/permission_denied.html');
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
ControllerException.NONE_CONTROLLER_TYPE = 'NO_CONTROLLER';
ControllerException.NONE_CONTROLLER_CODE = 500;
ControllerException.NODE_ACTION = '控制器方法不存在';
ControllerException.NONE_ACTION_TYPE = 'NO_ACTION';
ControllerException.NODE_ACTION_CODE = 500;
ControllerException.PERMISSION_DENIED = '服务器拒绝响应';
ControllerException.PERMISSION_DENIED_TYPE = 'NO_PERMISSION';
ControllerException.PERMISSION_DENIED_CODE = '403';

module.exports = ControllerException;