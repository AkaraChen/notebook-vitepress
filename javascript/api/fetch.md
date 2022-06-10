---
title: JavaScript Fetch API
date: 2022-05-10 18:41:59
tags:
category: 学习笔记
updated: 2022-05-10 18:41:59
---

fetch 是用于发起获取资源的请求的方法，属于我一直想学，但是一直被遗忘的好东西。在说明这为什么是个好东西之前我希望先拉踩一下 XHR。

## XHR 为什么该死

在过去，XHR 无疑是被大量使用的，以至于 Ajax 这个名词在很多人眼中仿佛跟 XHR 绑定在一起，XHR 之所以使用范围如此广泛，不是因为这个 API 好用，而是他出现的早，仅此而已。使用 XHR 很容易产出这样的代码：

```js
var xhr = new XMLHttpRequest();

xhr.onreadystatechange = function(){
  if (xhr.readyState === 4){
    if (xhr.status === 200){
      console.log(xhr.responseText);
    } else {
      console.error(xhr.statusText);
    }
  }
};

xhr.onerror = function (e) {
  console.error(xhr.statusText);
};

xhr.open('GET', '/endpoint', true);
xhr.send(null);
```

不用我说也知道，XHR 繁琐而又无趣（这么一大篇代码，我甚至没给这个请求添加什么参数）。因此出现了众多对 XHR 的封装，比如 Jquery 的 `$.ajax()`、axios 等等。除此之外，XHR 还不支持 Node.js（因为 Node.js 上有自带且更好用的 http 库），天下苦 XHR 久矣，所以救兵是谁呢？就是 fetch()。

## Hello, fetch

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

## 杂记：Bilibili 嵌入代码优化

```html
<div style="position: relative; padding: 30% 45%;">
    <iframe
        style="position: absolute; width: 100%; height: 100%; left: 0; top: 0;"
        src="//player.bilibili.com/player.html?aid=502193304&bvid=BV1PN411X7QW&cid=311661670&page=1"
        frameborder="no"
        scrolling="no"
      >
    </iframe>
</div>
```

每次用的时候替换一下播放器地址就行了。

## 结尾

明天大概会整理下 Cookie 和 localStorage 相关 API。

最后的最后，祝愿我们的小狼公主每天都能快乐。

今天我想多溜一会《红色高跟鞋》。

<div style="position: relative; padding: 30% 45%;">
    <iframe
        style="position: absolute; width: 100%; height: 100%; left: 0; top: 0;"
        src="//player.bilibili.com/player.html?aid=502193304&bvid=BV1PN411X7QW&cid=311661670&page=1"
        frameborder="no"
        scrolling="no"
      >
    </iframe>
</div>
