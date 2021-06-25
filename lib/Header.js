class Header {
    constructor(ctx) {
        this.header = ctx.header;
    }

    set(key, value) {
        this.header[key] = value;
    }

    get(key) {
        return this.header[key];
    }

    getAccept() {
        return this.header.accept;
    }
}

module.exports = Header;