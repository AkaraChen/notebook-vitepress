---
prev: false
next: types
---
# 类型系统

今天看看《编程与类型系统》，补一下基础知识，这本书用作示例的语言是 TypeScript，如果能因此加深对 TypeScript 的理解那自然是再好不过。

## 为什么存在类型

在底层硬件中，程序逻辑和操作的数据是用位来表示的，在这个级别，代码和数据没有区别，JavaScript 的 `eval()` 函数就是一个宽松解释代码的例子，如果在不当的地方使用 `eval()` 可能会导致运行时错误或是严重的安全漏洞。

除了区分代码和数据，我们还需要知道如何解释一条数据。比如十六位序列 `1100001010100011` 可以表示无符号整数 `49827` 或是带符号整数 `-15709`，然而运行程序的硬件均把数据储存为位序列，因此我们需要另一个层来为这些数据赋予意义。

类型为数据赋予了意义，告诉软件在上下文如何解释定位序列，使其保留期望的意义。

## 类型和类型系统的定义

类型：类型是对数据做的分类，定义了能够对数据进行的操作、数据的意义，以及允许数据接受的值的集合。编译器和运行时检查类型，保证数据的完整性，实施访问限制，同时依照开发人员的意图来解释数据。

类型系统：是一套规则，为编程语言的元素分配和实施类型。类型系统通过两种方式分配类型：代码中指定或是根据上下文推断。类型系统允许在类型之间进行某些转换，而阻止其他类型的转换。

## 类型系统的优点

类型系统的优点在于正确性、不可变性、封装、可组合性、可读性，这五种有点是优秀的软件设计和行为的根本特性。其他都挺简单，我们这里只提可变性：

假设有这么一个计算除法的函数：

```ts
let [prev, next] = [1, 2]
const divide = () => {
    if (next === 0) throw new Error("除数不能为0");
    return prev/next;
}
```

这行代码当然是可以正常运行的，前提是...没有其他线程在检查了 `next` 的值之后突然把 `next` 设置为 0。此时我们若是定义 `next` 的时候使用 `const`，就能避免这个问题，这就是不可变性的意义。

同时优化编译器会把常量内联成常量的值，从而生成更加有效的代码。在合理的情况下让尽可能多的数据不可变，能够显著减少问题。

## 类型系统的类型

### 静态类型与动态类型

动态类型不会在编译时添加任何类型约束，而静态类型则相反，静态类型能把运行时错误转换为编译时错误，让代码更容易维护，TypeScript 就是为了在 JavaScript 中引入静态类型检查而被创建的。

### 弱类型和强类型

类型系统的强度描述了系统在实施类型约束时的严格程度，弱类型系统会隐式的尝试将值从实际类型转换为使用该值期望的类型。

JavaScript 就是一门弱类型语言，因此能整出这种好活：

![Thanks for inventing JavaScript!](https://pic.akr.moe/20220516100746.png)

隐式类型转换很方便，但是也很危险，就像上面的梗图那样。在强类型语言 TypeScript 里则根本不会编译上面的比较语句
