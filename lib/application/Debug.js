const Debug = require('../Debug');
/**
 * application debug class and export class
 */
module.exports = class ApplicationDebug extends Debug {
    constructor(isDebug, DebugType) {
        super(isDebug, DebugType);
    }

    /**
     * 
     * @param {String} url 
     * @param {String} method 
     * @param {Object} getParams 
     * @param {Object} postParams 
     * @param {Number} usetime
     * @api public
     */
    print(url, method, getParams, postParams, usetime) {
        let msg = '【' + (new Date()).toLocaleString() + '】 ' + JSON.stringify({url: url, method: method, params: {querys: getParams, body: postParams}, usetime: usetime});
        this.outPut(msg);
    }
}