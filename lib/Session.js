
class Session {
    constructor(session) {
        this.session = session;
    }

    set(key, value) {
        if (!this.session) {
            return true;
        }
    }

    get(key) {

    }

    destroy() {
        this.session = null;
    }
}

module.exports = Session;