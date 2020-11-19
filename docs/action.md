# okgoes
## Action
- 说明
Action是框架内置类，每个控制器需要继承Action，并传递上下文对象。
```js
/**
* req为上下文请求对象
* res为上下文响应对象
*/
constructor(req, res){
    super(req, res);
}
```
### `_init`函数
- 说明 

`_init`是`Action`类的一个方法，在每一个`Action`方法调用时执行,返回值为`false`时将往下执行`Action`方法，执行完`Action`方法结束。返回`true`时将不会往下执行。执行完`init`函数结束。
- 作用

`_init`函数可以实现用户请求拦截，通过拦截请求做登录验证、权限验证。请求转发、重定向。
### 内置对象`request`
- 说明

 `request`为控制器内置属性对象，通过`this`关键字可以访问`request`对象的方法与属性。

 - 获取`post`传递的参数
 ```js
 // 获取post传递的数据
 this.request.post();
 // 获取psot传递对应key的数据
 this.request.post("key");

 // 获取原生数据
 this.request.getRowData();

 ```
 - 获取`get`传递的数据
 ```js
 // 获取get传递的数据
 this.request.getQuery();
 // 获取get传递的对应key的数据
 this.request.getQuery("key");
 ```
- 获取请求头(getHeader)
```js
// 获取所有的请求头信息
this.request.getHeader();
```
- 获取请求方式（getMethod）
```js
// 获取请求方式字符串，post,get,delete,put,options
this.request.getMethod();
```
- 获取客户端传递的所有请求方式的参数，不区分请求类型。(getAllParams)
```js
// 获取传递的所有参数
this.request.getAllParams();
// 获取制定key的参数，不区分请求类型
this.request.getAllParams("key");
```
- 获取action名称
```js
// 返回执行action的名称
this.request.getAction();
```
- 获取控制器名称
```js
// 返回执行的控制器名称
this.request.getController();
```
- 多模块开发时获取模块名称
```js
// 获取当前访问的模块，仅在多模块开发下有效
this.request.getModule()
```
- 获取session对象
```js
let session = this.request.session;
// 设置session
session.set('key', 'value');
// 获取设置的session
let value = session.get('key');
```
- 获取cookie对象
```js
let cookie = this.request.cookie;
// 设置cookie
cookie.setCookie('key', 'value');
// 获取cookie
let value = cookie.getCookie('key');
```
### 内置对象`response`
- 设置响应的状态码（setStatus）
```js
// 设置状态响应码为200
this.response.setStatus(200);
```
- 重定向（redirect）
```js
// 重定向到指定url
this.response.redirect("url");
```
### 内置方法
- renderHtml
```js
// 默认渲染，渲染路径为views目录所访问控制器名称目录下action名称文件名.html文件。指定传递到模板的参数
this.renderHtml({});
// 指定渲染路径,path为模板文件的路径，可以是相对于views目录的路径，指定传递到模板的参数
this.renderHtml('path', {});
```

- renderJson
```js
// 响应类型是：application/json，输出json类型数据到浏览器
this.renderJson({});
```