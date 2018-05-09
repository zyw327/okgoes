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
const Mysql = Okgoes.Mysql;
const mysql = new Mysql({host: '127.0.0.1', user: 'root', passwd: 'root', database: 'test', port: '3306'});
let select = mysql.getSelect();
selet.from({name: 'test', as: 't'}, ['id', 'name', ['age', 'pAge']]).fetchAll();
//相当于sql: SELECT id, name, age as pAge from test as t;
selet.from({name: 'test', as: 't'}, ['id', 'name', ['age', 'pAge']]).where({id: {$gt: 4}}).fetchAll();
//相当于sql: SELECT id, name, age as pAge from test as t where t.id > 4;
```
## Mongodb
```js
const Mongodb = Okgoes.Mongodb;
```
## Redis
```js
const Redis = Okgoes.Redis;
```
## ControllerAction
```js
const ControllerAction = Okgoes.ControllerAction;
```
