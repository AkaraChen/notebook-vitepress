# Express

本篇编写的目的是引导读者快速入门，马上写出一个 **能用** 的 api 服务，之后可能会补全服务端渲染的相关内容。

## 环境要求

1. Node.js（支持的版本跨度应该挺大，10-18 应该都没问题）
2. 能连上的 NPM 源/镜像
3. 一点点 JavaScript 基础

## Hello, World

```js
const express = require("express");

const app = express();

app.get("/", (req, res) => {
    res.send(req.query);
})

app.listen(8080, () => {
    console.log("Running!");
})
```

我觉得逻辑挺清晰的，先导包，再创建实例，然后配置在什么路径执行什么 handler，配置好了之后监听一个地址，很有 JavaScript 的风格。

这里的 handler 是返回了请求的 url 参数，如果有一定开发经验的人看到这里其实已经能写个简单的应用出来了，当然这离入门都很远，所以还得接着讲讲。

也可以支持 restful 风格的参数，比如这样子：

```js
app.get("/user/:uid", (req, res) => {
    res.send(req.params.uid);
})
```

如果想拦截其他类型的请求，比如 POST 就 `app.post()`，PUT 就 `app.put()`

## Request 对象

就简单讲点常用的。

### body

返回 http 请求的 body，当然是 string 类型。

### cookies

返回 http 请求携带的 cookie，返回类型是字符串，而非对象，转为对象需要用 express 提供的库。

```js
const cookieParser = require('cookie-parser');
app.use(cookieParser());
```

然后 cookies 会被转换为对象，并挂载到 cookies 的 signedCookies 属性上，这里用到了中间件，目前的知识尚不足解释，之后会讲。

### host

返回地址字符串，比如 `example.com:8000`，`182.22.122.111`，注意这里可能会附带端口

### hostname

返回地址字符串，不过不会附带端口，仅仅会返回域名或者 IP

### headers

字面意思，返回 http 请求的 header，格式是对象。

### ip

返回 IP 地址，字符串类型

### methods

返回 http 请求的方法，比如 `GET` `POST` `PUT` 这些。

## Response 对象

### send & json

`res.send()` 与 `res.json` 作用差不多，send 是传入 string 或者对象，当 send 传入对象的时候就跟 `res.json` 作用一样，返回 json 字符串。

### location()

字面意思，传入路径然后跳转，支持绝对、相对路径，或者传入 back 回退。

### redirect()

就字面意思了，传入路径然后重定向，跟上边的区别是，支持在第一个参数传入状态码，然后第二个参数传入路径，状态码可以不传。

### set()

设置 header 的，支持两种方式：

```js
res.set('Content-Type', 'text/plain');

res.set({
  'Content-Type': 'text/plain',
  'Content-Length': '123',
  ETag: '12345'
})
```

### status

```js
res.status(403).end();
res.status(404).send("404 not found");
```

## 中间件

express 的中间件很优雅：

```js
const myMiddleware = (req, res, next) => {
    // modify req ...
    req.body = 123;
    // modify res
    res.set('Content-Type', 'text/plain');
    // 必不可少的 next()
    next();
}

app.use(myMiddleware)
```

修改 req 或者 res，最后 `next()`，是真滴优雅。

放一下我的中间件，输出 express 被请求的方法、路径、访客 IP

```js
const consola = require("consola");

const infoMiddleware = (req, _res, next) => {
    consola.info(`${req.method} ${req.url} ${req.ip}`);
    next();
}
```

### CORS 中间件

```js
const cors = require("cors");

app.use(cors())
```

### 静态资源中间件

如果你想放静态资源，可以用自带的静态资源中间件

```js
app.use(express.static('public'))
```
