const fs = require('fs');
const path = require('path');
const DebugException = require('./debug/Exception');
/**
 * debug class and export
 */
class Debug {
    /**
     * 
     * @param {Boolean} isDebug 
     * @param {Number} debugType 
     */
    constructor(isDebug, debugType) {
        this.type = isDebug ? (debugType || Debug.CONSOLE) : Debug.NONE;
        this.path = global.PROJECT_PATH || null;
    }
    /**
     * 
     * @param {String} type 
     */
    setDebugType(type) {
        this.type = type;
    }
    /**
     * 
     * @param {String} path 
     */
    setDebugPath(path) {
        this.path = path;
    }
    /**
     * 
     * @param {String} msg 
     */
    outPut(msg) {
        switch (this.type) {
            case Debug.NONE:
                break;
            case Debug.CONSOLE:
                console.log(msg);
                break;
            case Debug.FILE:
                if (!this.path) {
                    throw new DebugException(DebugException.SAVA_PATH_IS_NOT_SETTING, DebugException.SAVA_PATH_IS_NOT_SETTING_CODE);
                }
                let savepath = '';
                if (global.PROJECT_PATH === this.path) {
                    savepath = this.path + '/data/debug/' + parseInt(Date.parse(new Date()) / (1000 * 86400));
                } else {
                    savepath = this.path + '/' + parseInt(Date.parse(new Date()) / (1000 * 86400))
                }
                Debug.mkdir(savepath);
                fs.appendFileSync(savepath + '/' + parseInt(Date.parse(new Date()) / (1000 * 3600)) + '.log', msg + '\r\n');
                break;
        }
    }
}

Debug.NONE = 0;
Debug.CONSOLE = 1;
Debug.FILE = 2;
Debug.mkdir = (filePath) => {
    if (fs.existsSync(filePath)) {
        return true;
    }
    if (!fs.existsSync(path.dirname(filePath))) {
        Debug.mkdir(path.dirname(filePath));
    }
    fs.mkdirSync(filePath);
}
module.exports = Debug;