# Fetch

目前 [Can I use](https://caniuse.com/fetch) 上显示 95% 的浏览器支持这一特性，因此可以大胆使用。

fetch 是基于 Promise 实现的，因此如果你熟悉 Promise 或者 axios，肯定感觉用 fetch 简直不能再简单易懂了：

```js
fetch('/endpoint')
  .then(response => response.json())
  .then(data => console.log(data))
```

简洁的令人心悸。当然这还差很多，后面慢慢说。

## 错误处理

错误处理有两种写法：

```js
fetch('/endpoint')
    .then(response => {
        //...
    })
    .catch(err => console.error(err))
```

也可以在 then 里解决：

```js
fetch('/endpoint')
    .then(response => {
        if (!response.ok) { throw Error(response.statusText) }
        return response.json()
    })
    .then(data => {
        console.log(data)
    })
```

## 请求参数

上面的实例只是默认用了 GET，而且没有添加自定义请求头，fetch 当然是支持的。只需要在 fetch() 方法传入一个对象作为参数就行。

```js
fetch('endpoint', {
    method: 'post',
    headers: {
        'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8'
    },
    body: 'name=carol'
})
```

## 响应对象

就直接这样访问 `response.headers.get` 就行

### 获得响应 Header

```js
fetch('/endpoint').then(response => {
    console.log(response.headers.get('Content-Type'))
})
```

### 获得响应状态码

```js
fetch('/endpoint').then(response => console.log(response.status))
```

返回的类型是 Number。

### 获得响应内容

我们能用到的也就这俩了：

1. `Response.text()`：将主体内容作为字符串返回
2. `Response.json()`：将主体内容经过 JSON.parse 转换后返回

两者返回的都是 Promise 对象，我们还是需要用 `.then()` 接收。

## ES7 提供的优雅（也许）写法

不知道为什么很多人都觉得 Promise 优雅，我还是感觉 Promise 很绕，我觉得只有用 ES7 提供的 `async`、`await` 才是真正的优雅。

```js
(async () => {
    const response = await fetch('/endpoint')
    const data = await response.json()
    console.log(data)
})()
```

不对，好像加上 `try/catch` 就不优雅了：

```js
(async () => {
    try {
        const response = await fetch('/endpoint')
        const data = await response.json()
        console.log(data)
    } catch (error) {
        console.log(error)
    }
})()
```
