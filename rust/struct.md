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

## 伪·构造函数

结构体没有构造函数，但是我们可以整个差不多的来简化结构体实例的创建。

```rust
fn create_user(name: String, nickname: String, active: bool) -> User {
    User {
        name,
        nickname,
        active,
    }
}
```
