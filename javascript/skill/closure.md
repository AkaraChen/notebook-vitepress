# 闭包

## 为啥要闭包

为了实现封装特性。

## 闭包示例

```js
var foo = (function() {
    var int = 0
    function change(val) {
        int += val
    }
    return {
        add : function() {
            change(1)
        },
        red : function() {
            change(-1)
        },
        value : function() {
            return int
        }
    }
})()

foo.add()
foo.add()
console.log(foo.value())
foo.red()
console.log(foo.value())
```

Output:

```text
2
1
```

这样子就实现了一定程度上的封装，整理一下伪代码，命名上我就用面向对象的术语，方便之后查笔记。

```js
var 类名 = (function() {
  var 私有成员变量 = 0
  function 私有成员方法(val) {
    成员变量 += val
  }
  return {
  公共方法: function() {
   私有成员方法(1)
  }
  公共Getter : function(){
   return 私有成员变量
  }
 }
})()
类名.公共方法()
终端.打印(类名.公共Getter())
```
