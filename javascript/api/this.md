# this 与 ABC

文末有参考链接，我看了很多文章才总结出来，这么个玩意我自己整理肯定是整理不全的。

## 为什么会有指向问题

在 JavaScript 中，函数真的是数据，可以随便搬，因此在全局作用域下的函数，`this` 会指向 `window`，在对象里的函数会指向对象，因此下面的代码运行结果可能会出乎人的意料。

```js
const fun = () => this.name

var obj = {
    name: "foo",
    fun1: fun
}

var name = "bar"
obj.fun1() // foo
fun() // bar
```

其实我也解释不清楚，目前我能做到的只有意会而不能言传。

## 情景

全局作用域不想解释了，这个肯定是返回 window 的，构造函数在[前几天的笔记](/js-22-4-10.html)里提到了，这里也不提了，唯一能说的也就绑定元素的情况

```js
var button = document.getElementByID("button");
button.onClick = function() {
    this // button
}
```

这里使用会绑定 HTML 元素自己

## abc 三兄弟

JavaScript 是一门非常强大的语言，所以 this 不光能根据运行环境变化，也能自己手动挡更改，有更改 this 指向能力的三个函数就是 `apply()`、`bind()`、`call()`，全都在 `Function.prototype` 上，人称 abc 三兄弟。

### apply()

我在[之前的文章](/js-22-4-11.html)提到，apply() 可用于替代展开操作符，那只是 apply 的一个简单用法而已。

apply() 的作用就是，把函数的 this 指向传入的第一个参数，并将第二个传入的列表作为函数的参数。如果传入的作用域为 null，那么函数的作用域不会更改，后面的列表依旧成为函数的实参，就实现了类似展开操作符的效果，说的好像很抽象，写个示例清楚点：

```js
Math.max(1,2,3) // 3，这个函数的作用是返回参数中的最大值
let arr = [1,2,3] // 然而我们有时候会拿到一个列表
// 第一步，先修改 this 指向，这里传入 null 所以实际上并没有改变 this
// 第二步把 arr 里的所有元素取出来传递给 Math.max 函数，属于独辟蹊径完成任务
Math.max.apply(null,arr) 
```

这种用法当然没有开发 apply() 的完整功能，下面的示例才是我要讲的东西

```js
let obj = {
    name: "foo"
}

function fun() {
    return this.name
}

fun.apply(obj, []) // foo
```

这里我们没有修改作用域，在全局作用域下就把函数 fun 的 this 指向了 obj，这就是 apply() 的作用。了解 call() 的大佬肯定发现这种情况用 call() 更好，但是在我眼里两个函数本质上一样，早讲哪个也无所谓，于是就按照字母顺序开始讲了。

### bind()

bind() 方法创建一个新的函数，在 bind() 被调用时，这个新函数的 this 被指定为 bind() 的第一个参数，而其余参数将作为新函数的参数，供调用时使用，下面是简单说下使用场景。

```js
const module = {
  x: 42,
  getX: function() {
    return this.x;
  }
};

const unBindGetX = module.getX;
console.log(unBindGetX()); // undefined
```

上面讲了那么多，这里为什么是 undefined 不用解释了吧？

```js
const bindedGetX = unBindGetX.bind(module);
console.log(boundGetX()); //42
```

### call()

这个就跟 apply 没啥大区别了，唯一不同是 apply() 接收参数列表，而 call() 需要挨个传入参数。

另外看到一种很有意思的说法，跟 call() 有关。我们一般有四种调用函数的形式：

1. `fun(p1)`
2. `obj.fun1(p1)`
3. `fun.call(context, p1)`
4. `fun.apply(context, p1)`

前面两种都只是第三四种的语法糖而已，因为前两个实际上可以转化为以下形式：

1. `func.call(undefined, p1)`
2. `obj.method.call(obj, p1)`

听起来确实很扯，但是好像又有点道理。

## 箭头函数

箭头函数里没有 this，所以在箭头函数里调用 this 实际上调用的是上级作用域的 this，因此箭头函数无法作为构造函数。

## 参考链接

1. 阮一峰博客：<http://www.ruanyifeng.com/blog/2018/06/javascript-this.html>
2. 西岭老湿：<https://zhuanlan.zhihu.com/p/42145138>
3. 饥人谷前端学习指南：<https://zhuanlan.zhihu.com/p/23804247>
