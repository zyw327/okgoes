module.exports = {
    getProjectPath: () => {
        if (!global.PROJECT_PATH) {
            global.PROJECT_PATH = path.dirname(path.dirname(__dirname));
        }
        
        if (global.PROJECT_PATH && global.PROJECT_PATH.length && global.PROJECT_PATH[global.PROJECT_PATH.length - 1] == "/") {
            global.PROJECT_PATH = global.PROJECT_PATH.substr(0, global.PROJECT_PATH.length - 1);
        }

        return global.PROJECT_PATH;
    }
};