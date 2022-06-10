# 面向对象

## 基于原型编程

在我之前的印象中，面向对象编程是完全等同于基于类（Class）编程的，所以我始终不认同 JavaScript 是一门面向对象的语言，目前看来这当然是一种谬误，因为面向对象编程还有很多分支：基于原型（代表语言 JavaScript）、契约式（代表语言 Kotlin）、面向切面（多用于 Java）、面向代理，因此 JavaScript 无疑是一种面向对象的语言。

这个模型通常是被认为是**无类、面向原型、基于实例**的编程。

如果要举个例子的话，在基于类编程的语言中，我们通常 `基于 Person 类创建了一个叫做 Bob 的新对象`，而在基于原型的语言中，我们则 `将现有的 Person 对象扩展成了一个叫做 Bob 的新对象`，至于这一切是基于什么原则实现的，我会在后边谈一谈我的理解。

## 原型链

> 本段以及下面的诸多段落大量参考廖雪峰的文章，原文在此：[创建对象](https://www.liaoxuefeng.com/wiki/1022910821149312/1023022043494624)

JavaScript 中每一个对象都会设置一个原型，指向它的原型对象，当我们访问对象的属性时，JavaScript 引擎会先从对象本身开始找，如果没找到就往它的原型对象找，最后找到 Object.prototype，如果这时候还没找到，那就返回 undefine。

假设一个名为 arr 的数组，它的原型链如下：

`arr => Array.prototype => Object.prototype => null`

因为 `Array.prototype` 定义了 `join()` 方法，所以 arr 可以调用，原型链就是这样的东西。

## 创建对象的方法

ES6 引入的 class 写法相信大家都会，但是这里是一个比较老的法子。

```js
function Person(name) {
    this.name = name;
    this.greet = () => "Hi,I'm " + this.name;
 }

// 为了怀旧所以用了 var 
var bob1 = new Person("Bob");
bob1.greet() // Hi,I'm Bob
```

当我们用 new 后面接上这种构造函数的时候，函数内的 this 实际上指向了新创建的对象，并且函数会默认返回 this，如此这般，就形成了类似 Java 的写法。

当你忘记写 new 时，函数里的 this 会指向 undefined，而在严格模式，则会指向 window 对象，函数则会创建大量的全局对象，既然这种写法这么糟糕，我们当然也是有法子解决的，类似于 Java 的工厂模式，我们创建一个 `createPerson()` 函数返回一个新 Person 对象就可以了，简单方便。

## 给原型添加属性

先上个代码示例。

```js
function app() {
    this.name = "app";
}

app.prototype.foo = "bar"

const app1 = new app();
app1.foo = "bar"
```

这种方式添加属性，不会对构造函数造成任何影响，只有在把函数当作构造器的时候这些属性才会起作用，但是这样添加的属性也附加在之前创建的对象上了。这是由于之前创建的对象虽然没有新添加的属性，但是 JavaScript 引擎会自动向上查找当前对象的原型，然后就找到了原型上刚刚添加的属性。

## 原型属性与自身属性

由于 JavaScript 引擎的原理，对象的自身属性必定会覆盖原型属性，有时候我们想判断对象到底有没有覆写原型属性，这时候 `hasOwnProperty()` 方法就派上用场了，用途就像它名字那样，并且返回一个布尔值。

## 枚举属性

我们可以用 for..in 循环来遍历对象，比如下面这个拼接 URL 字符串的示例。

```js
let params = {
    id: 233,
    section: 'products'
}

let url = "http://localhost:3000";

let query = []

for (item in params) {
    query.push(`${item}=${params[item]}`)
}

// http://localhost:3000?id=233&section=products
url += `?${query.join('&')}` 
```

这样枚举出来的就是对象的可枚举属性，我们在构造函数里整的玩意默认都是这样子。

## 第一种继承

书都过半了才开始讲继承，前置知识属实多了点...

```js
function Shape() {
    this.name = "shape",
    this.toString() = function() {
        return this.name;
    }
}

function TwoDShape() {
    this.name =  "2D shape"
}

function Triangle(side, height) {
    this.name = "triangle",
    this.side = side,
    this.height = height,
    this.getArea = function() {
        return this.side * this.height / 2;
    }
}
```

好了，三个构造器写好了，马上就是见证奇迹的时刻：

```js
TwoDShape.prototype = new Shape();
Triangle.prototype = new TwoDShape()；
```

嗯，这就是继承。这时候我们再实验一点东西：

```js
let triangle = new Triangle();
triangle.constructor === Triangle // false
// 这样继承会导致 Triangle 的默认 constructor 也继承自 TwoDShape，所以还要重写一下
Triangle.prototype.constrcutor = Triangle 
triangle instanceof Shape // true
triangle instanceof TwoDShape // true
triangle instanceof Triangle // true
```

确实实现了继承。这种继承方式把属性添加到对象的 prototype 属性中，并没有扩展这些对象的原型，这样的继承能保证继承实现之后，无论怎么更改 Shape() 都不会影响到 Triangle，当然这种行为可能在一些情况下不太好用，我们接着看其他的继承。

## 扩展原型链继承

这个感觉更符合 Java 那个继承的感觉。

```js
Triangle.prototype = Shape.prototype;
// 这种方法同样会导致 Triangle 的默认 constructor 也继承自 Shape，所以还要重写
Triangle.prototype.constrcutor = Triangle 
```

这样你更改 Shape 的原型链，Triangle 也会更改，当然这不总是最佳实践，我们还是要看情况来。

## 临时构造器

如果所有的 prototype 都指向一个相同的对象，那么父对象可能会受到子对象属性的影响，我们可以创建一个临时的构造器充当中介，打破这个联系

```js
let f = function(){};
f.prototype = TwoDShape.prototype;
Triangle.prototype = new f();
Triangle.prototype.constructor = Triangle;
```

## 子对象访问父对象

```js
function Shape();
Shape.prototype.toString = function() {
    return this.constructor.uber ? this.consctructor.uber.toString() : this.name;
}
TwoDShape.uber = Shape.prototype
```

至于为什么要叫 uber 呢，因为 JavaScript 有 super 关键字，uber 是德语中类似 super 的单词。

## 将继承封装为函数

每次继承都要写那么多肯定容易出错，不过好在这些都是可以封装的

```js
function extend(child, parent) {
    var f = function() {};
    f.prototype = parent.prototype;
    child.prototype = new f();
    child.prototype.constructor = child;
    child.uber = parent.prototype
}
```

## 浅拷贝与深拷贝

浅拷贝指复制对象引用到别的对象里，这样修改浅拷贝生成的对象，被拷贝的对象也会被修改。

```js
function copy(old) {
    let n = {};
    for (let item in old) {
        n[item] = old[i];
    }
    return n;
}
```

ES6 可以用 `Object.assign()` 达到一样的效果。

有浅拷贝自然也有深拷贝，先看一个简单法子实现深拷贝：

```js
let obj = {
    a: 10,
    b: 20
}

let obj1 = JSON.parse(JSON.stringify(obj));
```

这种法子简单方便，当然也有坏处，那就是不支持正则和函数，因为 JSON 不支持编码这俩类型，再看看完美的解法，用到了递归算法。

```js
function deepcopy(p,c) {
    // p 是要复制的对象，c 是用来放拷贝的内容的对象
    c = c || {} // 因为有这行代码，所以 c 可以不传入
    for(let item in p) {
        if (typeof p[i] === 'object') {
            c[i] = Array.isArray(p[i]) ? [] : {};
            deepcopy(p[i], c[i])
        } else {
            c[i] = p[i];
        }
    }
    return c
}
```
