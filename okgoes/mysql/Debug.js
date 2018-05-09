const Debug = require('../Debug');
class MysqlDebug extends Debug {
    constructor(isDebug, debugType) {
        super(isDebug, debugType);
    }

    print(sql) {
        let msg = '【' + (new Date()).toLocaleString() + '】 ' + sql;
        this.outPut(msg);
    }
}

module.exports = MysqlDebug;