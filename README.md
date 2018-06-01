# okgoes
## Install
```js
npm install --save okgoes-cli
okgoes-cli project
cd project
npm install
npm run start
```
## Application
```js
const Okgoes = require('okgoes');
const path = require('path');
// 设置项目根路径
global.PROJECT_PATH = path.dirname(__dirname);
//设置controller、model、views目录的上一级目录位置
global.APPLICATION_PATH = global.PROJECT_PATH + '/app';
// 创建应用实例
const Application = Okgoes.Application;
let app = new Okgoes.Application();
// 开启视图调试模式
app.setIsDebug(false);
// 开启cookie
app.setUseCookie(true);
// 监听端口
app.listen(3002);
```
## Mysql
```js
const Mysql = Okgoes.Mysql;
const mysql = new Mysql({host: '127.0.0.1', user: 'root', passwd: 'root', database: 'test', port: '3306'});
let select = mysql.getSelect();
await selet.from({name: 'test', as: 't'}, ['id', 'name', ['age', 'pAge']]).fetchAll();
//相当于sql: SELECT id, name, age as pAge from test as t;
await selet.from({name: 'test', as: 't'}, ['id', 'name', ['age', 'pAge']]).where({id: {$gt: 4}}).fetchAll();
//相当于sql: SELECT id, name, age as pAge from test as t where t.id > 4;
//插入
await mysql.insert({name: 'ttt', age: 18}, {table: 'test'});
// 开启事务
let transaction = await mysql.transaction();
try{
    await mysql.insert({name: 'ttt', age: 18}, {table: 'test', transaction: transaction});
    await mysql.update({name: 'ttt', age: 18}, {table: 'test', transaction: transaction, where: {id: {$gt: 4}}});
    // 提交事务
    await transaction.commit();
} catch (error) {
    // 回滚事务
    await transaction.rollback();
}
```
### Mysql.Model
```js
const Model = require('okgoes').Mysql.Model;
const Field = Model.Field;
class User extends Model {
    constructor() {
        // name表示表名，as表示表的别名
        super({name: 'user', as: 'User'}, {
            id: {
                type: Field.INTEGER, // 字段类型
                isPrimary: true, // 是否主键
                isAllowNull: false, // 是否可以为空
                autoIncrement: true // 设置自增
            },
            name: {
                type: Field.STRING(100),
                isAllowNull: false
            },
            age: {
                type: Field.INTEGER,
                isAllowNull: false
            },
            sex: {
                type: Field.INTEGER(1),
                isAllowNull: false
            },
            hobby: {
                type: Field.STRING(100)
            }, 
            school: {
                type: Field.STRING(100)
            }
        });
        this.setDbAdapter(mysql);
    }
}
const user = new User();
user.create(true); // 表存在则删除重建
user.create(false); // 表不存在则创建默认false
```
## Mongodb
```js
const Mongodb = Okgoes.Mongodb;
let mongodb = new Mongodb({
        user: "user",
        password: "password",
        host: 'localhost',
        port: '27017',
        database: 'test'
    });
// 获取mongodb客户端
let client = mongodb.getDb();
// 查询操作
let page = 1;
let pagesize = 10;
let where = {userid: {$gt: 10}};
let collection = 'test';
let res = await mongodb.find(collection, where, page, pagesize);
// 查询一条
res = await mongodb.findOne(collection, where);
// 更新操作
let data = {userid: 1};
res = await mongodb.update(collection, data, where);
// 删除操作
res = await mongodb.delete(collection, where);
// 插入操作
res = await mongodb.insert(collection, data);
//统计数目
res = await mongodb.count(collection, where);
```
## Redis
```js
const Redis = Okgoes.Redis;
let redis = new Redis({
        port: '6379', 
        host: "localhost",
        password: 'password'
    });
// 数据库选择
await redis.select(1);
// redis认证
await redis.auth('123456');
// 添加值
await redis.set('key', "value", 0);
// 获取值
await redis.get('key');
// 删除值
await redis.del('key');
// 序列化值
await redis.dump('key');
// 检查键是否存在
await redis.exists('key');
// 更新键的过期时间
await redis.expire('key', 1000);
// 设置过期时间
await redis.expireat('key', Date.parse(new Date()) / 1000 + 1000);
// 获取符合规则的键
await redis.keys(/\S+/);
// 获取redis客户端
let client = redis.getClient();
```
## ControllerAction
```js
const ControllerAction = Okgoes.ControllerAction;

class IndexController extends ControllerAction{
    constructor(req, res){
        super(req, res);
    }

    async index() {
        this.response.cookie.setCookie('name', 'zyw1223423');
        await this.renderHtml({msg: 'Hello World!'});
    }

    async json() {
        this.response.cookie.setCookie('name', 'zyw1223423');
        await this.renderJson({name: 'zyw'});
    }
}
module.exports = IndexController;
```
