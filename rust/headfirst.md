# 第一行代码

## 在 Windows 上配置环境

用 rustup 自动配置环境：

下载链接: <https://win.rustup.rs/x86_64>

需要**自由的网络访问权限**

之后检查一下 cargo 和 rustc：

```bash
> cargo
Rust's package manager

USAGE:
    cargo [+toolchain] [OPTIONS] [SUBCOMMAND]

> rustc
Usage: rustc [OPTIONS] INPUT
```

此时你已经配置完成了。之后便是配置 IDE 或者编辑器。

Vscode 用户可以安装官方的插件来为 Vscode 添加 rust 支持：[rust-analyzer](https://marketplace.visualstudio.com/items?itemName=rust-lang.rust-analyzer)，然而不清楚是什么原因，插件不能正常工作，我在[这个](https://github.com/rust-lang/rust-analyzer/issues/4172#issuecomment-620136065) issue 下找到了解决方案。

```powershell
rustup comonent add rust-src
```

此时万事俱备，可以来个 Hello, World 助兴了。

```powershell
nvim main.rs
```

```rust
// main.rs
fn main() {
    println!("Hello, World!")
}
```

```powershell
> rustc main.rs | .\test
Hello, World!
```

## new 一个工程

Rust 自带的包管理器 cargo 能帮我们新建一个脚手架：

```powershell
cargo new rust-learn
code rust-learn
```

入口文件是 `src/main.rs`，同时 cargo 提供了几个打包和调试的命令：

```powershell
cargo build
cargo run 
cargo build --release
```

## 基本类型

> 援引自 Rust 语言圣经

1. 数值类型: 有符号整数 (i8, i16, i32, i64, isize)、 无符号整数 (u8, u16, u32, u64, usize) 、浮点数 (f32, f64)、以及有理数、复数
2. 字符串：字符串字面量和字符串切片 &str
3. 布尔类型： true 和 false
4. 字符类型: 表示单个 Unicode 字符，存储为 4 个字节
5. 单元类型: 即 () ，其唯一的值也是 ()

## 定义常量、变量

只有 let 语句可用：

```rust
// 默认不可变
let a: i32;
let b = 2;
let c = 3_i32;
// 当然可以定义可变 
let mut d = 4;
```

let 关键字还是非常强大的。

## 下载外部包

用 cargo 创建的工程在根目录自带了一个 `Cargo.toml`，等同于 node.js 工程的 `package.json`，也有个 `Cargo.lock`，等同于 `package-lock.json` 、`yarn.lock`、`pnpm-lock.json` 等等。

扯远了，我们回到导入外部包这里。我们写入 `Cargo.toml`

```toml
[dependencies]
rand = "^0.4.0"
```

前面写包名后面写版本，写法跟 Node.js 一样，不用我教了。

然后下次 `cargo run` 或者 `cargo build` 的时候会自动下包。

## 导入

```rust
use rand::Rng;
use std::cmp::Ordering;
use std::io;
```

导入就是这样，跟 golang 类似。

第一个是随机数，第二个是比较数字大小的，第三个是 io 包。看起来万事俱备，我们可以写一个猜数游戏了。

## 猜数游戏

```rust
use rand::Rng;
use std::cmp::Ordering;
use std::io;

fn main() {
    // 生成随机整数，范围 [1, 101)
    let number: i32 = rand::thread_rng().gen_range(1, 101);
    // 记录你猜了多少次
    let mut time = 0;
    // 提示用户需要输入了
    println!("plz input your guess!");
    // loop 关键字，无限循环除非 break;
    loop {
        // 进入循环了，此时肯定是开始猜了一次，所以猜数次数 +1
        time += 1;
        // 新建一个 guess 变量，存储一会 io 输入的字符串
        let mut guess = String::new();
        // io 读取下一行输入，read_line() 传入存放结果的变量的指针，expect() 传入如果输入非法事报的信息
        io::stdin()
            .read_line(&mut guess)
            .expect("Unable to get input.");
        // rust 的重要特性：重新 let 就能隐藏之前的定义
        // 这里我们的目的是把 guess 变成可以跟 i32 比较的 i32 类型
        // trim() 先去掉空格
        // parse() 根据变量类型决定解析的类型，expect() 传入解析失败后的输入
        let guess: i32 = guess.trim().parse().expect("plz input a number");
        // match 是一种控制流运算符，它允许我们将一个值与一系列的模式相比较，并根据相匹配的模式执行相应代码。
        // guess.cmp() 传入要比较的值的指针
        match guess.cmp(&number) {
            // 如果不写满这三个条件，则编译器会警告
            Ordering::Less => println!("Smaller"),
            Ordering::Greater => println!("Bigger"),
            Ordering::Equal => {
                println!("You win! You have tried for {} times.", time);
                // break; 退出无限循环
                break;
            }
        };
    }
}
```
