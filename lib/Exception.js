/**
 * exception
 */
module.exports = class Exception extends Error {
    /**
     * 
     * @param {String} message 
     * @param {Number} code 
     */
    constructor(message, code) {
        super(message);
        this.code = code || null;
    }

    handle() {
        
    }

    html() {
        return `<!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>OKGOES-错误</title>
        </head>
        <body>
            ${this.stack.split(/\n/g).map((value, index) => {
                if (index === 0) {
                    return `<p style='color: red; font-size: 20px; font-weight: bold'>${value}</p>`;
                }
                return `<p>${index},${value}</p>`;
            }).join('')}
        </body>
        </html>`;
    }
}
