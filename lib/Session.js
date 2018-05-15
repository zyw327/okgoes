const sessionStatic = null;
/**
 * Session
 */
class Session {
    /**
     * 
     * @param {Object} session 
     */
    constructor(session) {
        if (!sessionStatic) {
            this.session = session;
            sessionStatic = session;
        } else {
            this.session = sessionStatic;
        }
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