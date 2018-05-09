const fs = require('fs');
const path = require('path');

class Build {
    constructor() {
        this.copyOperator = new CopyOperator();
        this.path = path.dirname(path.dirname(path.dirname(__dirname)));
    }
    build(buildPath) {
        this.copyOperator.copy(path.dirname(__dirname) + '/template', (buildPath || this.path));
    }
}

class CopyOperator {
    constructor() {
        this.stat = fs.statSync;
    }
    readDir(basePath, encoding) {
        return fs.readdirSync(basePath, {encoding: encoding || 'utf8'});
    }

    copy(basePath, destPath, encoding) {
        let dirs = this.readDir(basePath, encoding);
        for (let file of dirs) {
            if (file === '.git' || file === 'package.json') {
                return ;
            }
            if (this.stat(basePath + '/' + file).isDirectory() && file !== 'okgoes') {
                this.copy(basePath + '/' + file, destPath + '/' + file);
            }
            if (this.stat(basePath + '/' + file).isFile() && file !== 'index.js') {
                if (!fs.existsSync(destPath)) {
                    CopyOperator.mkdir(destPath);
                }
                if (fs.existsSync(basePath + '/' + file)) {
                    if (file === 'test.js') {
                        if (!fs.existsSync(destPath + '/public')) {
                            CopyOperator.mkdir(destPath + '/public');
                        }
                        fs.writeFileSync(destPath + '/public/index.js', fs.readFileSync(basePath + '/' + file));
                    } else {
                        fs.copyFileSync(basePath + '/' + file, destPath + '/' + file);
                    }
                    
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