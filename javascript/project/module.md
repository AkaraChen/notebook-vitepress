# 模块

## 全局变量时代

这个时代算不上模块化

### window

刀耕火种时代，JavaScript 工程（哦不对，那时或许压根算不上工程），我们只能通过 window 对象来实现文件之间的通信。

```js
// config.js
var token = 'lorem'
var config = {
    token: token
}
```

```js
// request.js
function request() {
    setTimeout(() => {
        console.log(window.token)
    }, 2000);
}
```

实现起来确实是简单，但是问题也很明显，一直在全局作用域声明变量，全局变量有冲突的可能，而且代码可读性很差。

### IIFE

IIFE 其实也没好多少，只是把全局作用域变量名冲突的问题解决了，但是问题还是很多。

```rust
// config.js
(function (root) {
    var token = 'lorem'
    var config = {
        token: token
    }
    root.config = config
})(window)
```

归根结底，还是没有一个合理的模块化方案。

## 百家争鸣时代

于是，几种模块化方法理所应当的产生了，大部分都是特定领域的，而且规范各不相同，无法共通

### CommonJS

CommonJS 是 Node.js 提供的方案，所以浏览器上肯定是没法用的。

```js
// config.js
var token = 'lorem'
var config = {
    token: token
}
module.exports = config
```

```js
// request.js
var config = require('config');
var util = {
    request: function() {
        setTimeout(() => {
            console.log(token)
        }, 2000);
    }
}
module.exports = utils;
```

```js
// main.js
var request = require("request").request

request()
```

CommonJS 看起来很简单也很易用，然而并没有加入 ES6 豪华套餐，自有原因在此。

其中最重要的一点是，CommonJS 是同步加载模块的，如果在服务端（就比如 Node.js），加载模块的速度就等于访问硬盘的速度，那倒是不怕时间长，但是在浏览器端，这种等待会高达几百毫秒，对用户体验的打击肯定是巨大的。

### AMD

所以，就出现了 AMD，专门用于浏览器的模块规范，AMD 的模块定义是异步的。

```js
// config.js
define(function() {
  var api = 'https://github.com/ronffy';
  var config = {
    api: api,
  };
  return config;
});
```

```js
// utils.js
define(['./config'], function(config) {
  var utils = {
    request() {
      console.log(config.api);
    }
  };
  return utils;
});
```

```js
// main.js
require(['./utils'], function(utils) {
  utils.request();
});
```

调用啥的都是异步的，因此在浏览器上表现良好不会假死。

还有个 CMD 方案跟 AMD 类似，不过这玩意比 AMD 死的还透，所以就不提了。

### UMD

这个就属于把 AMD 和 CommonJS 拧起来了。

原理很简单，就判断现在是啥环境，如果是 Node.js 就导出为 CommonJS 模块，如果是浏览器环境就判断有没有引入 AMD，有就导出 AMD 模块，否则就导出到 window 对象。

```js
(function (window, factory) {
    if (typeof exports === 'object') {
     
        module.exports = factory();
    } else if (typeof define === 'function' && define.amd) {
     
        define(factory);
    } else {
     
        window.eventUtil = factory();
    }
})(this, function () {
    //module ...
});
```

## ESM 时代

终于...各种方案百家争鸣快十年了，可算是有官方的方案了。

### 导出的三种方式

```js
// config.js
export const token = 'lorem'
```

```js
// config.js
const token = 'lorem'
export {
    token
}
```

这两种只是写法不同，实际上效果一致，再有就是默认导出。

```js
// config.js
export default 'lorem'
```

默认导出和之前的导出方式是不冲突的，可以在一个文件里一起使用。

### 导入的四种方式

对于前两种导出的方法，导入的方法是一致的：

```js
import { token } from './config.js'
```

或者这样：

```js
import * as config from './config.js'

console.log(config.token)
```

对于默认导出，就这样写：

```js
import 你甚至可以在这另起一个名字 from './config.js'

console.log(你甚至可以在这另起一个名字)
```

也可以整体加载，但是不导入任何接口：

```js
import './config.js'
```

也支持动态加载：

```js
function foo() {
  import('./config.js')
    .then(({ token }) => {

    });
}
```
