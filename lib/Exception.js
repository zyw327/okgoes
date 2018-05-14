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
}
