/**
 * Session
 */
class Session {
    /**
     * 
     * @param {Object} session 
     */
    constructor(session) {
        this.session = session;
    }
    /**
     * 
     * @param {String} key 
     * @param {String} value
     */
    set(key, value) {
        if (!this.session) {
            return false;
        }
        this.session[key] = value;
    }
    /**
     * 
     * @param {String} key 
     * @return {String}
     */
    get(key) {
        if (!this.session) {
            return false;
        }
        return this.session[key];
    }
    /**
     * destroy
     */
    destroy() {
        this.session = null;
    }
}

module.exports = Session;