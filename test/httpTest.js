const HttpClient = require('../lib/http/Client');
const request = require('request');
const host = "http://localhost:3002";

let httpClient = new HttpClient();

httpClient.setMethod(HttpClient.POST);
httpClient.setParams({a: 2, b: {x: [1,3]}});
httpClient.setUrl(host + '/index/api');

(async () => {
    // request('http://www.baidu.com', {json: true}, function(error, response, body) {
    //     console.log(error, response.headers, response.request.headers, body);
    // });
    console.log(await httpClient.send());
})();