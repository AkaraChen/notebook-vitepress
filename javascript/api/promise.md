# Promise

先看看示例

```js
const promise = new Promise((resolve, reject) => {
    success? resolve(value) : reject(value)
})
```

当内部的逻辑正常运行时，我们通过 resolve 方法返回结果，这时 Promise 应该处于完成状态，当错误和异常发生时，我们通过 reject 进行通知并返回错误内容。

之后我们就可以使用 Promise 对象了。

```js
promise
    .then( result => console.log(result) )
    .catch( error => throw error )
```

好了，东西会了，写代码的时候照样不会用。
