# Golang

以后 Golang 大概会跟 JavaScript 同步进行，目前自我感觉良好，所以 Go 入门的笔记会很粗暴。

## 安装

下载地址：<https://go.dev/dl/>
Vscode 配置：<https://blog.akr.moe/vscode-config.html>

## Hello, World

```go
package main
import "fmt"

func main() {
    fmt.Println("Hello, World!")
}
```

```shell
$ go run main.go
Hello, World!
```

或者编译成二进制文件，Windows 上会编译成 `main.exe`，Linux 上会编译成 `main`

```shell
$ go build main.go
$ ./main.exe
Hello, World!
```

## 部分特性

package 就类似 Java 里的 package，没什么好说的。import 就是导包，也没啥好说的，但是编译的时候如果导的包没用，会编译错误，这是 golang 的争议之一。fmt 包含了格式化字符串和输出等常用的功能。

## 声明

四种**主要**的声明语句：var、const、type、func，分别代表变量、常量、类型和函数。

函数的规则跟 typescript 一样，函数的参数和返回值必须有类型标记，变量和常量初始化的时候要么有一个值，让 golang 自己指定一个类型，要么指定一个类型，否则无法初始化。

```go
package main

import "fmt"

const num1 = 1

var num2 int16

func main() {
 num2 = 2
 fmt.Println(add(num1, num2)) // 3
}

func add(num1 int16, num2 int16) int16 {
 return num1 + num2
}
```

还有种简单声明

```go
num1 := 1
```

因为必须初始化的原因，这种简单声明不支持添加类型注解，因为没有必要，因为简短所以常用于局部变量的声明，比如 for 循环的时候，另外这种简单声明还有个微妙的特性，当标识符已经被定义的时候，并不会初始化，而是仅更改变量的值。

简单声明、var、const 都支持一行语句赋值多个。

```go
const num1, num2 = 1, 2
var num1, num2 = 1, 2
num1, num2 := 1, 2
```

## 指针

如果我们用 `var x int` 定义一个 x 变量，那么 `&x` 就是 x 变量的内存地址，这个指针的数据类型就是 `*int`

## new 函数

new 里头写变量类型，然后函数返回一个变量地址

```go
p := new(int)
```

这实际上跟声明式的语句没有什么区别，只是语法糖而非新的概念。

## 元组赋值

可以这么直接交换值

```go
x, y = y, x;
```
