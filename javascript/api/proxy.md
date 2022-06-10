# 元编程

从ECMAScript 2015 开始，JavaScript 获得了 Proxy 和 Reflect 对象的支持，允许你拦截并定义基本语言操作的自定义行为（例如，属性查找，赋值，枚举，函数调用等）。借助这两个对象，你可以在 JavaScript 元级别进行编程。

人话就是，让程序通过某种方法自己获取或者操作自身结构，用代码生成代码。

## Proxy

我们可以通过 Proxy 获悉某个对象的行为，如它何时被调用，何时被访问。

Proxy 接收两个参数：

1. handler：处理你想要自定义的操作
2. target：要套 proxy 的原对象

下面的代码演示了拦截不存在的参数，并让他的值返回 42

```js
let handler {
    get: function { target,name } {
        return name in target ? target[name] : 42;
    }
}

let p = new Proxy({} ,handler);
p.a = 100;
p.b = undefined;
console.log(p.a, p.b) // 100, undefined
console.log('c' in p, p.c) // false, 42
```

能拦截 get，那肯定也能拦截 set，比如下面的验证设置对象的年龄：

```js
let check = {
    set: (obj, prop, value) => {
        if (prop === 'age') {
            // 判断出错了就直接退出，就不会更改对象
            if (!Number.isInteger(value)) {
                throw new TypeError('age must be a number')
            }
        } 
        // 最后必须写这个才能修改对象内容
        obj[prop] = value;
    }
}

let p = new Proxy({}, check);
p.age = "One" // TypeError
```

get 能拦截数据，自然也能拦截函数，但是函数的处理方式复杂点

```js
let obj= {
    method: function() {
        console.log("Method")
    }
}

let handler {
    get: function(target, propkey, receiver) {
        if (typeof target[propkey] != "function") {
            return target[propkey];
        } else {
            console.log("Handle");
            return target[propkey].apply(target, arguments)
        }
    }
}

const proxy = new Proxy(obj, handler);
proxy.method() // Handle, Method
```
