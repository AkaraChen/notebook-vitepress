# PostgreSQL

## 安装

1. Windows：<https://www.enterprisedb.com/downloads/postgres-postgresql-downloads>
2. Debian： `apt install postgresql-12`

Windows 上都是无脑下一步了，没啥好提的，而聪明的 Linux 用户应该用不着我提醒。

## 登录

Windows 用户使用开始菜单搜索 `SQL Shell (psql)`，Linux 用户使用 `PSQL` 命令进入 PostgreSQL 命令提示符。如果你登录成功，会看到提示符会变成`postgres=#`，然后再试试键入 `help`，如果输出这样的信息就算成功了（大概）。

> 您正在使用psql, 这是一种用于访问PostgreSQL的命令行界面.
> 键入： \copyright 显示发行条款
> \h 显示 SQL 命令的说明
> \? 显示 pgsql 命令的说明
> \g 或者以分号(;)结尾以执行查询
> \q 退出

看起来，PostgreSQL 的 Syntax 跟 MySQL 差别好像很大，但是这只是命令行而已，实际上的语句都是较为标准的 SQL 语句的。
嗯，此时你已经能连接 PostgreSQL 了，还是直接打开 Navicat、Datagrid 罢。

## 些许不同

PostgreSQL 跟 MySQL 还是有些不同的，目前我所知道的，只有层级上的区别，PostgreSQL 多了一层 Schema，中文叫`模式`（国内大多这么叫），或者`架构`（Jetbrains IDE 喜欢这么叫），看别人的解释是，说是这样就能让一个数据库里存在相同表名，不知对错，但是我觉得好像是这么回事。

## 创建“模式”

```sql
create schema 模式名
```

## 创建表

命令如下，跟 MySQL 也就差在多了一个模式名而已。

```sql
create table 模式名.表名 (
    条目名 类型 约束
)
```

大概就这样子。

## 数据类型

- 布尔型：使用“boolean”或“bool”声明true或false值。
- 字符值

1. char：拥有一个字符
2. char（＃）：保存＃个字符数。将插入空间以填补任何额外的空间。
3. varchar（＃）：最多包含＃个字符数。

- 整数值

1. smallint：-32768和32767之间的整数。
2. int：-214783648和214783647之间的整数。
3. serial：自动填充的整数。

- 浮点值

1. float（＃）：浮点数，至少有＃个精度点。
2. real：8字节浮点数
3. numeric（＃，after_dec）：拥有#位数的实数，小数点后有after_dec位

只列了一些初级的玩意，我现在能用上的玩意。

## 约束

1. NOT NULL：列不能具有空值。
2. UNIQUE：任何记录的列值都不能相同。Null始终被视为唯一值。
3. PRIMARY KEY：上述两个约束的组合。每张表只能使用一次。
4. CHECK：确保列中值的条件为真。
5. REFERENCES：值必须存在于另一个表的列中。

约束和数据类型设计的看起来好简洁。

## 其他

仔细想来，对于我这种初学者来说，跟 MySQL 的差别好像就只是在操作表的时候要附加一个模式名，好像也仅此而已了
