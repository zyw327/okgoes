const fs = require('fs');
const path = require('path');
/**
 * build application frameset and export
 */
module.exports = class Build {
    /**
     * @api public
     */
    constructor() {
        this.copyOperator = new CopyOperator();
        this.path = path.dirname(path.dirname(path.dirname(__dirname)));
    }
    /**
     * build
     * @param {String} buildPath 
     * @api public
     */
    build(buildPath) {
        this.copyOperator.copy(path.dirname(__dirname) + '/template', (buildPath || this.path));
    }
}
/**
 * copy operator
 */
class CopyOperator {
    /**
     * @api public
     */
    constructor() {
        this.stat = fs.statSync;
    }
    /**
     * read dirs
     * @param {String} basePath 
     * @param {String} encoding 
     * @return {Array}
     * @api public
     */
    readDir(basePath, encoding) {
        return fs.readdirSync(basePath, {encoding: encoding || 'utf8'});
    }
    /**
     * copy
     * @param {String} basePath 
     * @param {String} destPath 
     * @param {String} encoding 
     */
    copy(basePath, destPath, encoding) {
        let dirs = this.readDir(basePath, encoding);
        for (let file of dirs) {
            if (file === '.git') {
                return ;
            }
            if (this.stat(basePath + '/' + file).isDirectory() && file !== 'okgoes') {
                this.copy(basePath + '/' + file, destPath + '/' + file);
            }
            if (this.stat(basePath + '/' + file).isFile()) {
                if (!fs.existsSync(destPath)) {
                    CopyOperator.mkdir(destPath);
                }
                if (fs.existsSync(basePath + '/' + file)) {
                    fs.copyFileSync(basePath + '/' + file, destPath + '/' + file);
                }
            }
        }
    }
}
/**
 * 
 * @param {String} filePath 
 */
CopyOperator.mkdir = (filePath) => {
    if (fs.existsSync(filePath)) {
        return true;
    }
    if (!fs.existsSync(path.dirname(filePath))) {
        CopyOperator.mkdir(path.dirname(filePath));
    }
    fs.mkdirSync(filePath);
}
