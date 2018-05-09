# okgoes
## Install
```bash
npm install --save okgoes
const Okgoes = require('okgoes'); 
```
## Build
* 建立项目目录结构
```js
// 引入okgoe
const Okgoes = require('okgoes');
// 创建build对象
let build = new Okgoes.Build();
build.build(__dirname); //在当前目录建立目录结构，默认当前目录
```
## Application
```js
const Application = Okgoes.Application;
```
## Mysql
```js
const Application = Okgoes.Mysql;
```
## Mongodb
```js
const Application = Okgoes.Mongodb;
```
## Redis
```js
const Application = Okgoes.Redis;
```
## ControllerAction
```js
const Application = Okgoes.ControllerAction;
```
