# TypeScript

> 本文废话偏多，而且颇有些传教意味。

## 正题前的一点废话

最近在忙一个[企划](https://github.com/zhutianproject)，在构思的时候突发奇想，想用 JavaScript 写个爬虫，后来一想，干脆试着写 TypeScript 吧，因为不熟悉 TypeScript（因为压根没学），被一些小问题卡了好久，于是决定学一下 TypeScript，就有了这篇文章。

## 学习指北

得益于 TypeScript 可以通过转译器直接在浏览器运行，所以你应该使用 [TypeScript PlayGround](https://www.typescriptlang.org/zh/play) 学习。这跟你在电脑上倒腾几分钟各种配置要优雅的多，而且当你有安卓平板/iPad的时候，你可以直接躺在床上学习。

学习资料的话，看 [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html) 即可，官方也提供了 [pdf 版本](https://www.typescriptlang.org/assets/typescript-handbook.pdf)，残念ながら（并不），没有中文。

## 正文/笔记

### TypeScript 解决的痛点

JavaScript 由于众所周知的原因，最初设计的十分仓促，至于现在能这么热门，实在是一种历史的谬误。而 TypeScript 解决的是众多 JavaScript 程序员深恶痛绝的特性：没有完善的类型检查。JavaScript 是一门弱类型语言，在编写代码的时候无法察觉到类型不匹配，而 TypeScript 则是一门强类型语言，会在编译的时候就帮你检查静态类型，因此更适合编写大型应用。

话说的有些抽象了，那就上点代码片段吧。

```javascript
const message = "Hello World!";
message();
```

看出错误了吗？这段代码尝试调用 String 类型的变量，在浏览器中，他自然会报错

```text
Uncaught TypeError: message is not a function
```

然而在此期间，你的编辑器或者 IDE 不会有任何反应，因为在语法上这段代码是合法的。然而同样的代码，放在 TypeScript 中可不会这样，TypeScript 会在编译的时候就提醒你。

再看一段:

```javascript
const user = {
    age: 18,
    name: foo
}

console.log(user.location)
```

同样的，这都是合法语句，然而在运行的时候就会报错，而 TypeScript 的静态类型检查足以规避这种错误。

### 如何使用类型

就像 Java 一样简单，上代码：

```typescript
const name:string = "Foo";

const greet = (name:string, date:Date) => {
    console.log(`Hi,${name}!It's ${date.toDateString}`) // Hi,Foo!It's Fri Mar 04 2022
}

const greetWithObject = (greetObject: { name:string,date:Date }) => {
    greet(greetObject.name, greetObject.date) // Hi,Foo!It's Fri Mar 04 2022
}

const greetString = ():string => {
    return "Hello,World!"
}
```

不同于 Java 把类型写在变量名前面，TypeScript 把类型写在变量名后，差别也就这样了。
还有两个特殊的类型，值得细说：

1. `Array<sometype>` ：写 Java 的或许会非常熟悉，Array 后头接个“菱形”，表示这个数组里头全都是这个类型。
2. `any` ： 禁用针对这个变量的类型检查，如果对所有变量都采用 any 类型，那么 TypeScript 将失去意义。

需要注意的是，TypeScript 会自动判断类型，你不必为每个变量都加上类型标注。

### 可选参数

TypeScript 支持给函数设置可选参数，就在参数名后面加上`?`就行。

```typescript
const printName(name: { first:string, last?:string }) => {
    let str = !last ? name.first : `${first} ${last}`
    console.log(str)
}
```

### 共用体

就是为一个东西设置多种类型。

```typescript
const printID = (message:String|Number) => {
    if(message instanceof String) {
        console.log(message);
    }else{
        console.log(`Number:${message}`)
    }
}
printID(1) // Number:1
printID("Ghost") // Ghost
```

同样，也适用于函数返回

```typescript
const someFunc = (type:boolean):String|Number => {
    if (type) return "Hello"
    return 1
}
console.log(someFunc(true)) // "Hello"
console.log(someFunc(false)) // 1 
```

### 定义类型

字面意思，定义类型。

```typescript
type myType = "true" | "false" | "unknown"
const foo:myType = "true"
const bar:myType = "something" // Type '"something"' is not assignable to type 'myType'.
```

```typescript
type myObj = {
    code:number,
    data:Object
}
const response = (res:myObj) => {
    console.log(`code is `${res.code})
}
response({ code:200,data:null }) // code is 200
```

### 定义接口

学过面向对象的懂得都懂，不想多提了。

```typescript
interface myObj = {
    code:number,
    data:Object
}
```

### 接口和类型的继承

```typescript
interface Animal {
  name: string
}

interface Bear extends Animal {
  honey: boolean
}

type Animal = {
  name: string
}

type Bear = Animal & { 
  honey: boolean 
}
```
