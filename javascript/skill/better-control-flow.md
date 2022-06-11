# 选择结构

## 二元表达式替代 if

这种就是二元表达式，相信各位不用我多讲

```js
let [a, b] = [1, 2]
a > b 
    ? alert("a大") 
    : alert("b大")
```

仅仅适合放一些简单的逻辑，

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

## 逻辑与操作符

如果你只是想在满足某个条件时执行一个函数，那么你可以使用逻辑和运算符。

```js
if (true) {
  alert(1)
}
// 等同于
true && alert(1)
```

## Array.prototype.includes()

在上一节中，我们讨论了如何优化一对一的选择结构，这里我们讨论如何优雅地实现一对多的选择结构。

```js
const getContinent = (option) => {
  if (option === "China" || option === "Japan") {
    return "Asia";
  }
  if (option === "Germany" || option === "France") {
    return "Europe";
  }
};

console.log(getContinent("China"));
```

现在看起来并没有那么糟糕，因为我还没有把所有的国家都加进去。这当然是可以优化的，而且可以通过使用Array的includes方法轻松避免。

```js
const getContinent = (option) => {
  const Asia = ["China", "Japan"];
  const Europe = ["Germany", "Franch"];
  if (Asia.includes(option)) return "Asia";
  if (Europe.includes(option)) return "Europe";
  return "Unknown";
};

console.log(getContinent("China")); // Asia
```

经过这种优化，即使增加更多的国家，代码也不会变得杂乱无章。但它可以变得更好。

```js
const getContinent = (option) => {
  let [result, setResult] = ["unknown", (str) => (result = str)];
  const Asia = ["China", "Japan"];
  const Europe = ["Germany", "Franch"];
  Asia.includes(option) && setResult("Asia");
  Europe.includes(option) && setResult("Europe");
  return result;
};

console.log(getContinent("China"));
```

## 结语

广泛查阅资料的时候知道了柯里化这个好玩的玩意，同时也感觉到自己对 JavaScript 高级编程了解不深，之后几天可能会重新啃一下那几本 js 经典书。
