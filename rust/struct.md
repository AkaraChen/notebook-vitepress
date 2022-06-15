# 结构体

结构体就是自定义数据类型，允许我们命名多个相关的值然后组合成有机整体。

使用起来非常简单：

```rust
fn main() {
    let user = User {
        name: String::from("AkaraChen"),
        nickname: String::from("AKRC"),
        active: true
    };
}

struct User {
    name: String,
    nickname: String,
    active: bool
}
```

还有种元组结构体：

```rust
fn main() {
    let color = Color(20, 20, 20);
}

struct Color(i32, i32, i32);
```

我们可以对结构体添加 `mut`，但是这样会让所有的值都可访问，Rust 不支持定义其中的哪个属性不可修改。

## 添加方法

```rust
struct Rectangle {
    width: i32,
    height: i32
}

impl Rectangle {
    fn area(&self) -> i32 {
        self.width * self.height
    }
}
```

在方法上传入一个  `&self` 就能成为方法，访问 `&self` 就能访问实例，当然也可以添加 `&mut self`，就像函数那样。

## 关联函数

在 OOP 语言里我们一般称其为构造函数：

```rust
fn from(width: i32, height: i32) -> Rectangle {
    Rectangle {
        width,
        height,
    }
}
```

然后我们就可以用 `Rectangle::from()` 来创建构造函数了。
