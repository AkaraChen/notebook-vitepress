# 枚举与模式匹配

## 枚举

最简单的枚举就这样：

```rust
enum Coin {
    Penny,
    Nickel,
    Dime,
    Quarter,
}
```

当然这样可远远不够，我们可以把信息内联在里头，在部分情况下可以替代结构体：

```rust
enum IPAdress {
    V4(i32, i32, i32, i32),
    V6(String),
}
```

不仅是基础类型，你可以嵌入字符串、数值、结构体，甚至另一个枚举。

## match 关键字

现在想理解 Rust 的 `match` 关键字就简单了：

```rust
fn main() {
    let coins = [Coin::Penny, Coin::Nickel, Coin::Dime, Coin::Quarter];
    for coin in coins.iter() {
        println!("{}", coin.value_in_cent())
    }
}

impl Coin {
    fn value_in_cent(&self) -> i32 {
        match self {
            Coin::Penny => 1,
            Coin::Nickel => 5,
            Coin::Dime => 10,
            Coin::Quarter => 25,
            _ => 1
        }
    }
}
```

我们必须穷举所有可能，否则无法编译通过，我们如果懒得处理所有情况，那就用 `_` 来作为托底的值。
