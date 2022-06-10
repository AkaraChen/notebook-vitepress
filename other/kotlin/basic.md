# Kotlin

Kotlin 是<del>喷气大脑</del> Jetbrains 开发的静态类型语言，比 Jvav 更精炼，比竞品 Scala 更简单，跟 Jvav 一样运行在 jvm 里头。然而这些优点并不是让我去学它的原因，我要学只是因为他成为安卓主流开发语言了，仅此而已。再就是特性了，Kotlin 是简单、支持异步、面向对象、支持函数式编程、易于调试的。

## 学习指北

在今天，我的学习仅限于了解 Kotlin 特性，而非上手安卓开发，所以我需要的仅是一个支持运行 Kotlin 代码的环境，因此我掏出了我的安卓平板学习，只需要打开 [Kotlin Playground](https://try.kotlinlang.org)，就能运行 Kotlin 代码，记这篇博客用的是 [Cloudstudio](https://cloudstudio.net)，腾讯家的免费云端 IDE，让我不用忍受自建 Code-server 可能遇到的各种问题。

## 定义变量、常量、方法

Kotlin 定义变量、常量、方法的方式我前所未见，她使用 `var` 和 `val` 来分别定义变量和常量，用 `fun` 来定义方法。<del>怎么一股子 TypeScript 味啊？</del>

```kotlin
val value = 1
value = 3 // 报错，常量不支持更改
var variable = 2
variable = 3 // 正常更改
fun greet(some args) { // some method }
```

想必你已经反应过来了，val 是 value 的简写，对应 Java 中的 final 变量，var 是 variable 的简写，对应 Java 中的非 final 变量，强行逼你在定义变量的时候就想好这玩意能不能改变，<del>Kotlin 教你写代码了属于是</del>真是精妙的设计。

然而，类型呢？是的，你没提到过类型，这是因为 Kotlin 会自己推导类型，就像 TypeScript 一样，你也可以自己标注类型，但是这跟 Java 由大不相同，反而是跟 TypeScript 一样。

```kotlin
var text:String = "something"
var text:Int = 1
var text:Integar = Integar(1)

fun greet(name:String):String {
    return "Hello,"+name+"!"
}

println(greet("akr")) // Hello,akr!
```

是的，只需要在变量和方法的形参后边附上类型就可以了。
另外你应该反应过来了，Kotlin 不用在语句结尾加`;`。

## 基元类型

可能刚刚你看到 `var text:Int` 时产生了一些误会，但是实际上，基元类型已经完全消失了，你现在 Int 跟 int 相比，虽然只有一个大小写的差别，但是已经完全变成对象了。同样的，boolean、long、short、float、double、char、byte 也都完全消失了。

## when

对标的是 Java 的 switch，不过比那傻逼玩意好用多了，不用加 `break;`或是 `case`。

```kotlin
fun getStr(name:String) = when(name) {
    "app" -> "learn kotlin"
    "author" -> "akrc"
    else -> "not found"
}

println(getStr("author"))
```

写法就是如此简单，但是比 Java 多了一条，必须添加一个兜底的，就是上边那个 `else`

when 还支持类型判断，这个就有点意思了。

```kotlin
fun<T> getType(name:T) = when(name) {
    is Int -> "it's Int"
    is String -> "it's String"
    else -> "unknown"
}
```

`fun<T>` 这个涉及泛型，在这里暂时不详细讲了。

## if

本来以为都是 c-like syntax 差不了太多，结果不小心回去看了几眼，发现 Kotlin 的 if 还是有点意思的。

```kotlin
val a = 1
val b = 2
val max = if (a>b) {
    a
}else{
    b
}
print(max)
```

是的，不用写 return，直接在最后一行写着返回啥值就行，然而这还能再精简一点

```kotlin
val a = 1
val b = 2
val max = if (a>b) a else b
print(max)
```

嗯，这完全就是二元表达式嘛，不过逻辑看着挺清晰，不费眼，但是我顺着这里去试了一下 Kotlin 支不支持 Java 的二元表达式，得到的结果是，不能。<del>又教我写代码是吧</del>

## for

Kotlin 完全舍弃了 `for(;;)` 这种循环，全部改成 `for (x in x)` 这种了，但是也还是可以很简单的实现原先的 `for(;;)` 的。

```kotlin
for (i in 1..3) print(i) // 123
```

写法精炼，事好文明。这种写法在数学上表达是 `[1,3]`，但是有时候我们需要 `[1,3)` 这个也是能实现的

```kotlin
for (i in 1 until 3) print(i) // 12
```

当然不止于此，还能倒着来

```kotlin
for (i in 3 downTo 1) print(i) // 321
```

选择一次跳几个数也是可以的

```kotlin
for (i in 3 downTo 1 step 2) print(i) // 31
```

## 格式化字符串

Kotlin 的格式化字符串甚至比 es6 更简洁，直接把大括号都省了，只需要"$"后面接上变量名。

```kotlin
val name = "东雪莲"
print("my name is $name") // my name's 东雪莲 
```

Google 搜 Kotlin 格式化字符串居然完全没搜到这种写法，中文 Kotlin 学习资源这到底是有多缺啊...

## 创建集合

```kotlin
val list = listOf("apple","pen")
for (item in list) print("$item ")
```

需要注意，这样创建的集合是不可变的，只能读，不能增删改，如果需要创建可变数组就需要用 `mutableListOf` 了，这样创建的数组可以用 `add` 方法，也就可以增删改了。

以上是 List 集合，Set 集合只需要分别替换 `List` 为 `Set`。

Map 的写法稍微不同，但是确实精炼

```kotlin
val map = mutableMapOf("name" to "Kotlin")
print(map["name"]) // Kotlin
```

## Lambda 表达式

```kotlin
val list = listOf("Apple", "Banana", "Orange")
val maxLengthFruit = list.maxByOrNull { it.length }
print(maxLengthFruit)
```

`maxByOrNull` 就是根据后面传入的值的大小排序，`it` 是个语法糖，第二行是等效于这么写的：

```kotlin
val maxLengthFruit = list.maxByOrNull { fruit -> fruit.length }
```

带我重新认识 lambda 表达式了属于是。

## map && filter

还不错，真的挺有意思的。

```kotlin
val list = listOf("Apple", "Banana", "Orange")
val newList = list.filter { it.length <= 5 }
    .map { it.uppercase(Locale.getDefault()) }
newList.forEach { print(it) }
```

`uppercase` 方法 kotlin 新实现的，比原来的说是更好用，看起来这是支持多语言了的样子

## any && all

any 就是查找集合内有没有符合条件的，all 就是看看里面是不是都是符合条件的。

```kotlin
val list = listOf("Apple", "Banana", "Orange")
val hasApple:Boolean = list.any { it == "Apple" }
val hasSevenLetter:Boolean = list.all { it.length == 7 }
print(hasApple) // true
print(hasSevenLetter) // false
```

## 使用 Java 的函数式 API

嗯，可以直接这么硬写，感觉比 Java 简洁太多了。

```kotlin
Thread { print("Hello,Thread!") }.run()
```

换 Java 要这么写

```java
new Thread(new Runnable() {
 public void run() {
  System.out.println("Hello,Thread!");
 }
}).start();
```

以前写 Java 的时候我还觉得 Java 的实现很简洁，我到底是忍受了多少人间疾苦...

## 处理空指针异常

如果你尝试在任何一处 Kotlin 代码的函数传入一个 `null` 实参，都会直接报错，但是有时候你需要传入一个 `null`，也是有法子的，只需要在函数形参，给参数的类型后头加一个问号就行，之后调用这个形参的时候，只需要判断一下传入的是不是 `null` 就行了。

```kotlin
fun study(study : Study?) {
    if (study != null) {
        study.doMethod()
    }
}
```

同时，`if (study != null)` 也是有简化写法的。

```kotlin
study?.doMethod()
```

注意，平时调用方法的操作符是 `.`，但是这里的操作符是 `?.`，而非 `.`，千万注意。还有个 `?:` 操作符，类似 es6 的 `||`，如果左边的为 falsy，就返回右边的，反之就返回左边的。

```kotlin
print(null ?: "akr") // akr
```

## let

其实这个也应该归在上边的处理空指针异常章节的，但是我感觉这个重要，就新开了一个章节。

```kotlin
study?.let {
    it.someMethod1()
    it.someMethod2()
}
```

如果判断前面的非 null，就执行函数体里的。

## 用键值对给函数传参

学到这已经麻了，看来改进是真不少，多了好多我喜欢的特性...

```kotlin
fun main() {
    print(greet(name = "Akara"))
}

fun greet(name:String): String {
    return "Hello,$name!"
}

```
