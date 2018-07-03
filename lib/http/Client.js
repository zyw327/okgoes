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
            requset(this.url, (() => {
                switch (this.method) {
                    case Client.PATCH:
                        return {method: this.method, form: this.params, headers: this.header};
                    case Client.POST:
                        return {method: this.method, form: this.params, headers: this.header};
                    case Client.OPTIONS:
                        return {method: this.method, form: this.params, headers: this.header};
                    case Client.DELETE:
                        return {method: this.method, qs: this.params, headers: this.header};
                    case Client.GET:
                        return {method: this.method, qs: this.params, headers: this.header};
                    case Client.PUT:
                        return {method: this.method, form: this.params, headers: this.header};
                    default:
                    return {method: Client.GET, qs: this.params, headers: this.header};
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