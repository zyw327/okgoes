
class Parse {
    constructor(url) {
        this.url = url;
        this.urlPath = [];
    }

    _parse() {
        if (/\s+/.test(this.url) || this.url.replace('\s+', '') === '/') {
            return ;
        }
        let str = '';
        if (this.url.indexOf('?') === -1 && this.url.indexOf('#') === -1) {
            str = this.url.substr(1);
            this.urlPath = str.length ? str.split('/') : [];
            return ;
        }

        if (this.url.indexOf('?') !== -1 && this.url.indexOf('#') === -1) {
            str = this.url.substr(0, this.url.indexOf('?'));
            str = str.substr(1);
            this.urlPath = str.length ? str.split('/') : [];
            return ;
        }

        if (this.url.indexOf('?') === -1 && this.url.indexOf('#') !== -1) {
            str = this.url.substr(0, this.url.indexOf('#'));
            str = str.substr(1);
            this.urlPath = str.length ? str.split('/') : [];
            return ;
        }

        if (this.url.indexOf('?') !== -1 && this.url.indexOf('#') !== -1) {
            str = this.url.substr(0, (this.url.indexOf('#') > this.url.indexOf('?') ? this.url.indexOf('?') : this.url.indexOf('#')));
            str = str.substr(1);
            this.urlPath = str.length ? str.split('/') : [];
            return ;
        }
    }

    getUrlPath() {
        this._parse();
        return this.urlPath;
    }
}

module.exports = Parse;