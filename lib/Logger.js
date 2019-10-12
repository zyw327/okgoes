
const fs = require("fs");
const system = require("./System");
function parseLoggerConfig() {
    let projectPath = system.getProjectPath();
    let loggerConfig = {
        savePath: projectPath + "/logs",
        consoleOut: true,
        fileOut: true
    };
    if (fs.existsSync(projectPath + "/app/configs/logger.js")) {
        loggerConfig = require(projectPath + "/app/configs/logger.js");
    }

    return loggerConfig;
}

class Logger {
    constructor() {
        
    }

    info() {

    }

    debug() {

    }

    trace() {

    }

    error() {

    }

    warn() {

    }
}

Logger.factory = (controller, options) => {
    let logger = new Logger();
    return logger;
}

module.exports = Logger;