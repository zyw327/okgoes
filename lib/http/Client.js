const requset = require("request");
class Client {
    constructor() {
        this.method = Client.POST;
        this.url = '';
        this.params = '';
        this.header = {"content-type": "application/json; charset=utf-8"};
    }

    setMethod(method) {
        this.method = method;
    }

    setUrl(url) {
        this.url = url;
    }

    setParams(params) {
        this.params = params;
    }

    setHeader(header) {
        this.header = header;
    }

    send() {
        return new Promise((resolve, reject) => {
            requset((() => {
                switch (this.method) {
                    case Client.PATCH:
                        return {url: this.url, method: this.method, body: JSON.stringify(this.params), headers: this.header};
                    case Client.POST:
                        return {url: this.url, method: this.method, body: JSON.stringify(this.params), headers: this.header};
                    case Client.OPTIONS:
                        return {url: this.url, method: this.method, body: JSON.stringify(this.params), headers: this.header};
                    case Client.DELETE:
                        return {url: this.url, method: this.method, qs: this.params, headers: this.header};
                    case Client.GET:
                        return {url: this.url, method: this.method, qs: this.params, headers: this.header};
                    case Client.PUT:
                        return {url: this.url, method: this.method, body: JSON.stringify(this.params), headers: this.header};
                    default:
                    return {url: this.url, method: Client.GET, qs: this.params, headers: this.header};
                }
            })(), (error, response, body) => {
                if (error) {
                    return reject(error);
                }
                resolve({body, response: response.headers, req: response.request.headers});
            });
        });
    }
}

Client.POST = "POST";
Client.PUT = "PUT";
Client.OPTIONS = "OPTIONS"
Client.PATCH = "PATCH";
Client.DELETE = "DELETE";
Client.GET = "GET";

module.exports = Client;