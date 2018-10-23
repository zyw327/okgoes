const HttpClient = require('../lib/http/Client');
const request = require('request');
const host = "http://localhost";

let httpClient = new HttpClient();

httpClient.setMethod(HttpClient.GET);
httpClient.setParams({phone: "123456", parkId: 9});
httpClient.setUrl(host + '/user/validator');

(async () => {
    // request('http://www.baidu.com', {json: true}, function(error, response, body) {
    //     console.log(error, response.headers, response.request.headers, body);
    // });
    console.log(await httpClient.send());
})();