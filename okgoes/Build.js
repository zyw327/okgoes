const fs = require('fs');
const path = require('path');

class Build {
    constructor() {
        this.copyOperator = new CopyOperator();
        this.path = path.dirname(path.dirname(__dirname));
    }
    build(buildPath) {
        this.copyOperator.copy(path.dirname(__dirname), (buildPath || this.path));
        // console.log(this.copyOperator.readDir(path.dirname(__dirname)));
    }
}

class CopyOperator {
    readDir(basePath, encoding) {
        return fs.readdirSync(basePath, {encoding: encoding || 'utf8'});
    }

    copy(basePath, destPath, encoding) {
        console.log(basePath, destPath);
        let dirs = this.readDir(basePath, encoding);
        for (let file of dirs) {
            if (file === '.git') {
                return ;
            }
            let stat = fs.statSync(basePath + '/' + file);
            if (stat.isDirectory) {
                this.copy(basePath + '/' + file, destPath + '/' + file);
            }
            if (stat.isFile) {
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
CopyOperator.mkdir = (filePath) => {
    if (fs.existsSync(filePath)) {
        return true;
    }
    if (!fs.existsSync(path.dirname(filePath))) {
        CopyOperator.mkdir(path.dirname(filePath));
    }
    fs.mkdirSync(filePath);
}
module.exports = Build;