# 基础

## 几个简单的命令

反正，千万记得每个语句结束要用`;`。

```sql
// 通过 MySQL cilent 快捷方式打开 MySQL CLI
show database; // 获取数据库列表
create database [数据库名] // 创建数据库
drop database [数据库名] // 删除数据库
use [数据库名] // 切换到这个数据库
show tables // 查看数据库下有多少数据表
desc [表名] // 获取该表有多少列
```

## 约束条件

| 约束条件 | 说明                           |
| ----------- | -------------------------------- |
| PRIMARY KEY | 主键约束，用于唯一标识对应的记录 |
| FOREIGN KEY | 外键约束                     |
| NOT NULL    | 非空约束                     |
| UNIQUE      | 唯一约束                     |
| DEFAULT     | 默认值约束，用于设置字段的默认值 |
| AUTO_INCREMENT | 自增约束                 |

## 创建带有联合主键的表

```sql
create table example02 (
    stu_id int,
    course_id int,
    grade float,
    primary key(stu_id,course_id)
);
```

primary key 可以传入一个键，这样就跟在键的后边加 `AUTO INCREAMENT` 一样了。

## 指定表的引擎

在创建表的最后一个括号之后加上语句 `engine=myisam`，Maria DB 10.6 后 myisam 被废弃。

## 查看表的信息

```sql
desc 表名
```

## 设置递增主键

> 以下步骤由 dbeaver 完成

1. 首先，先新增一个列(废话)
2. 给表中的每一项都分配一个值
3. 切到'约束'菜单，新建约束，选中新建的列，确定
4. 保存变更
5. 切换为原来的选项卡，勾选自增

## 设置外键约束

```sql
create table stu (
    foreign key (键在这个表的名字) references 外部的表名(外部表的哪个键)
)

```

示例：

```sql
create table stu_table (
    foreign key (class) references class_table(class_id)
)
```

## 上课的练习

```sql
create table classT (
    id int primary key auto_increment,
    className varchar(20) not null,
    classAdress varchar(30) default "笃信楼"
);

create table stuT (
    stuNo char(6) primary key,
    stuName varchar(20),
    stuSex char(2) default "女",
    idCard char(5) unique,
    idClass int,
    foreign key (idClass) references classT(id)
);
```

## 添加主键

```sql
alter table stuT add primary key(idClass);
alter table stuT add constraint a foreign key (idClass) references classT(id);
```
