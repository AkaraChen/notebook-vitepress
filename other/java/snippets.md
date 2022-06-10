# Java

## 获取类下所有 public 成员变量

```java
    Field[] fields = Class.forName("com.sth.Student").getFields();
        for (Field item : fields) {
        System.out.println(item);
    }
```

想输出所有变量，就 `getDeclaredFields()`

## 初始化块

```java
public class Student {
  static {
    e.print("执行一次");
  }
}
```

初始化块的代码会在类的构造方法执行之前进行，并由 jvm 保证只会执行一次。如果有多个初始化块，顺序如下：

1. 父类的静态初始化块
2. 子类的静态初始化块
3. 父类的初始化块
4. 父类的构造函数
5. 子类的初始化块
6. 子类的构造函数

## 重写类的 toString() 方法

当你直接 `System.out.println()` 时，实际上是调用了类的 toString() 方法。
因为所有的类都默认继承了 Object 类，所以肯定是都有 toString() 方法的，他默认是输出类名和内存地址的，如果不想输出这个，想修改这个就直接 `@Override` toString 方法就行，比如这样：

```java
@Override
public String toString() {
    return "年龄是" + age;
}
```

## 两种多线程、闭包

```java
var a = new Runnable() {
  @Override
  public void run() {
    e.print(getClass());
  }
};
a.run();
new Thread(() -> {
  String name = "name";
    e.print("Hello," + name + "!");
}).start();
```

## 枚举

反正不管怎么看都觉得沾点脑瘫，枚举有个球用

```java
// EnumTest.java
Spring("春"), Summer("夏"), Fall("秋"), Winter("冬");
private final String name;

EnumTest(String name) {
    this.name = name;
}

public String getName() {
    return this.name;
}
```

```java
var a = EnumTest.Spring;
System.out.print(a.getName());
```

## 遍历集合中的元素的三种方式(已知)

```java
// 使用 Iterator
// 假如其他进程/线程修改了集合 Iterator 会直接报错，这防止了资源共享带来的问题
var books = new HashSet<>();
books.add("疯狂 Java 讲义");
books.add("ES6 标准入门");
var a = books.iterator();
while (a.hasNext()) {
    e.print(a.next());
    a.remove();
}
```

```java
// 使用 forEach
books.forEach(o -> e.print(o));
books.forEach(e::print) // 另一种写法，暂时没学过
```

```java
// 在 Iterator 里头再套一个 forEach ，反正我是没看懂
var a = books.iterator();
a.forEachRemaining(o -> e.print(o));
```

## 删除集合中的元素

```java
books.remove("疯狂 Java 讲义");
books.removeIf(o -> o.toString().length() == 10);
```

## 通过 IntStreamBuilder 操作集合

```java
var books = IntStream.builder();
books.add(1).add(2).add(3);
e.print(books.build().max().getAsInt()); // idea 提示不安全，建议用下面那种
e.print(books.build().max().orElse(1)); // orElse 的作用是设置默认值，在没值返回的情况下至少传一个值
```

## Set 家族

在使用上跟 Collection 没什么区别，但是不允许重复的值，且 Set 不支持 null 值，但 HashSet 支持。
Set 和 HashSet 中的元素的顺序通常是无法确定的，但是读取元素因此变得非常快。
有个 LinkedHashSet ，顺序是固定的

## Map 家族

跟 Set 的读写趋于一致，但是这是储存键值对的集合，部分方法不同，放个实例吧

```java
var books = new LinkedHashMap<>();
books.put("name", "navel");
books.put("music", "Desire");
e.print(books.values());
e.print(books.keySet());
```

## 使用 JDBC

```java
import org.json.simple.JSONValue;

import java.sql.*;
import java.util.HashMap;
import java.util.LinkedList;

public class App {
    public static void main(String[] args) throws SQLException, ClassNotFoundException {
        Class.forName("com.mysql.cj.jdbc.Driver");
        Connection connection = DriverManager.getConnection("jdbc:mysql://localhost:3306/test", "root", "password");
        Statement statement = connection.createStatement();
        ResultSet resultSet = statement.executeQuery("select * from shop_item;");
        LinkedList<Object> list = new LinkedList<>();
        while (resultSet.next()) {
            HashMap<String, Object> map = new HashMap<>();
            map.put("name", resultSet.getString(1));
            map.put("price", resultSet.getInt(2));
            list.add(map);
        }
        System.out.println(JSONValue.toJSONString(list));
        connection.close();
    }
}
```

## 使用 maven 安装 mysql 驱动 和 json 第三方库

直接加到 pom.xml 里头

```xml
<dependencies>
  <dependency>
    <groupId>mysql</groupId>
     <artifactId>mysql-connector-java</artifactId>
     <version>8.0.25</version>
  </dependency>
 <dependency>
     <groupId>com.googlecode.json-simple</groupId>
     <artifactId>json-simple</artifactId>
     <version>1.1.1</version>
 </dependency>
</dependencies>
```

然后使用 IDEA 的同步按钮

前几天不是没学，是学的太零碎，不想写了，去学 Spring boot 被卡住了，问了老师才知道，学完 Java 基础之后应该学 Java Web。
换上了 IDEA Ultimate 版本才知道我之前原来配置 Spring boot 项目/Java Web 项目是这么容易...我之前到底走了多少弯路...

## 写 Dao 层

Dao 层是存取数据的层

```java
package com.example.jsplearn;

import org.json.simple.JSONValue;

import java.sql.*;
import java.util.*;

public class GetUserDao {
    public static String get() throws ClassNotFoundException, SQLException {
        Class.forName("com.mysql.cj.jdbc.Driver");
        Connection connection = DriverManager.getConnection("jdbc:mysql://localhost:3306/test", "root", "passwd");
        Statement statement = connection.createStatement();
        ResultSet resultSet = statement.executeQuery("select * from shop_item;");
        LinkedList<Object> list = new LinkedList<>();
        while (resultSet.next()) {
            HashMap<String, Object> map = new HashMap<>();
            map.put("name", resultSet.getString(1));
            map.put("price", resultSet.getInt(2));
            list.add(map);
        }
        connection.close();
        return JSONValue.toJSONString(list);
    }
}
```

## Servlet

写完 Dao 层，读取了数据，然后就可以在 Servlet 层输出了

```java
package com.example.jsplearn;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.sql.SQLException;

@WebServlet(name = "getUser", value = "/get/user")
public class GetUserServlet extends HttpServlet {
    @Override
    public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
        response.setContentType("text/json");
        PrintWriter out = response.getWriter();
        try {
            out.println(GetUserDao.get());
        } catch (ClassNotFoundException | SQLException e) {
            e.printStackTrace();
        }
    }
}
```

## JSP 写法

就像写 PHP 一样，不过这玩意可以直接调用我熟悉的 Java 对象。

```java
// 引入类
<%@ page import="com.example.jsplearn.DateUtil" %>
// 调用
<p>Today is <%=DateUtil.getToday()%>
```

## 安装 Maven

```powershell
// 这里的 sudo 是我自己装的 gsudo ，作用是在 powershell 里头快速切换到 admin 用户
sudo choco install maven
```

## 安装 Spring Boot

我自己安装依赖的时候会报错，原因是没指定 version，网上的教程都告诉我换阿里云源，倒腾半个点没倒腾好，略有点无语

```xml
<dependencies>
  <dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-web</artifactId>
    <version>2.6.1</version>
  </dependency>
  <dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-maven-plugin</artifactId>
    <version>2.6.1</version>
  </dependency>
</dependencies>

<build>
  <plugins>
    <plugin>
      <groupId>org.springframework.boot</groupId>
      <artifactId>spring-boot-maven-plugin</artifactId>
      <version>2.6.1</version>
    </plugin>
  </plugins>
</build>
```
