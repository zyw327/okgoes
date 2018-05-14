/**
 * url parse and export class
 */
module.exports = class Parse {
    /**
     * 
     * @param {String} url 
     * @api public
     */
    constructor(url) {
        this.url = url;
        this.urlPath = [];
    }
    /**
     * parse url
     * @api private
     */
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
    /**
     * get url
     * @return {Array}
     * @api public
     */
    getUrlPath() {
        this._parse();
        return this.urlPath;
    }
}
