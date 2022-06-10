# 选择结构

## Why

昨天写了个很简单的作业，老师考察 switch/ifelse，我写完之后看着满屏的 switch/ifelse 心生厌烦，于是就把 ifelse 改成了二元表达式，但是 switch 又不知道怎么改，于是就去网上搜了搜方案，现在搞个差不多了就记下笔记。

## 二元表达式替代 if

这种就是二元表达式，相信各位不用我多讲

```js
let [a, b] = [1, 2]
a > b ? alert("a大") : alert("b大")
```

我们也可以选择使用匿名函数，在一边放下多行代码：

```js
let [a, b] = [1, 2];
a < b ? (() => {
    alert("a小")
})() 
    : alert("b小");
```

在匿名函数里再嵌套一个二元表达式，就实现了类似 if 嵌套的东西：

```js
let [a, b, c] = [1, 2, 3];
a < b ? (() => {
    a < c ? alert("c大") : alert("a大");
})()
    : alert("a小");
```

到这里你可能已经看出局限性了，这种写法好像跟 ifelse 并没有太多差别，而且很难看清。

## 表驱动替代 switch

js 的 switch 很弱智，随便整个方案都肯定比那玩意强

```js
const getFlow = (option) => {
    let flow = new Map()
        .set('increment', () => increment())
        .set('reduce', () => reduce())
        .set('info', () => output());
    return flow.has(option) ? flow.get(option)() : console.log("默认方法");
}

getFlow('increment')
getFlow('something') // 默认方法
```

优越性不言自明，少了很多行，而且不用写 `break;`，同时该有的都有，无疑是非常完美的方案。

用对象实现也很简洁

```js
const getFlow = (option) => {
    let flow = {
        1: "Monday",
        2: "Tuesday",
        3: "Wednesday",
        4: "Thursday",
        5: "Friday",
        6: "Saturday",
        0: "Sunday"
    }
    return flow[option] ?? "Unknown"
}
alert(getFlow(8))
```

把函数作为参数传递肯定也是可取的，而且同样很简洁

```js
const getFlow = (option) => {
    let flow = {
        1: () => alert(1),
        2: () => alert(2),
    }
    flow[option]?.() ?? alert(NaN)
}
getFlow(1) //1
getFlow(3) //NaN
```

## 结语

广泛查阅资料的时候知道了柯里化这个好玩的玩意，同时也感觉到自己对 JavaScript 高级编程了解不深，之后几天可能会重新啃一下那几本 js 经典书。
