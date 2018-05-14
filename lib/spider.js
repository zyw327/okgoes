const request = require('request');
const cheerio = require('cheerio');
const iconv = require('iconv-lite');

/**
 * 蜘蛛
 */
class Spider {
    /**
     * 构造函数
     * @param {String} url
     * @param {String} encoding
     * @param {Boolean} gzip
     */
    constructor(url, encoding, gzip) {
        this.url = url;
        this.encoding = encoding || 'gb2312';
        this.gzip = gzip || false;
    }
    /**
     * 获取
     * @param {String} url
     * @param {String} encoding
     * @param {Boolean} gzip
     * @return {Promise}
     */
    get(url, encoding, gzip) {
        this.url = url || this.url;
        this.encoding = encoding || this.encoding;
        this.gzip = gzip || this.gzip;
        return new Promise((resolve, reject)=>{
            request({url: this.url, gzip: this.gzip, encoding: null}, (error, response, body) => {
                if (!error && response.statusCode == 200) {
                    body = iconv.decode(body, this.encoding);
                    let $ = cheerio.load(body);
                    resolve($);
                } else {
                    reject(error);
                }
            });
        });
    };
}

module.exports = Spider;
