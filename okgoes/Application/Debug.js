const Debug = require('../Debug');

class ApplicationDebug extends Debug {
    constructor(isDebug, DebugType) {
        super(isDebug, DebugType);
    }

    print(url, method, getParams, postParams, usetime) {
        let msg = '【' + (new Date()).toLocaleString() + '】 ' + JSON.stringify({url: url, method: method, params: {querys: getParams, body: postParams}, usetime: usetime});
        this.outPut(msg);
    }
}

module.exports = ApplicationDebug;