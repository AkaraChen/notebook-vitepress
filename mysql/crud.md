# CRUD

## 读取数据

一个语句由一个 ";" 结束，如果可以的话，尽量分很多行，让思路更加清晰

```sql
select price from shop_item
where price = 80;
```

```text
+-------+
| price |
+-------+
| 80    |
+-------+
```

## 插入数据

```sql
insert into shop_item (name,price)
values ('tencent','140');
```

```text
Query OK, 1 row affected (0.020 sec)
```

## 组合字符串

```sql
select concat(name,' price is ',price) from shop_item
```

```text
+---------------------------------+
| concat(name,' price is ',price) |
+---------------------------------+
| navel price is 80               |
| yuzu price is 160               |
| tencent price is 140            |
+---------------------------------+
```

## 使用算术表达式计算

在 select 后面直接写算术表达式，后面接上 as 列名就可以输出了

```sql
select name,price/7 as dollarPrice from shop_item
```

```text
+---------+--------------------+
| name    | dollarPrice        |
+---------+--------------------+
| navel   | 11.428571428571429 |
| yuzu    | 22.857142857142858 |
| tencent |                 20 |
| netease | 17.142857142857142 |
+---------+--------------------+
```

## 取整/精准取小数

`select cast(19.16558 as decimal(9,2))`精确到几位
`select round(123.5);`四舍五入
`select floor(123.5);`取整数部分
`select ceil(123.5);`四舍五入

```sql
select name,floor(price/7) as dollarPrice from shop_item;
```

```text
+---------+-------------+
| name    | dollarPrice |
+---------+-------------+
| navel   |          11 |
| yuzu    |          22 |
| tencent |          20 |
| netease |          17 |
+---------+-------------+
```

## 综合运用一下

```sql
select concat(name,' price is ',floor(price/6.7),' dollar.') from shop_item;
```

```text
+-------------------------------------------------------+
| concat(name,' price is ',floor(price/6.7),' dollar.') |
+-------------------------------------------------------+
| navel price is 11 dollar.                             |
| yuzu price is 23 dollar.                              |
| tencent price is 20 dollar.                           |
| netease price is 17 dollar.                           |
+-------------------------------------------------------+
```

## 一次插入多条数据

一次插入多条数据的性能比一个 insert 插入一个好得多

```sql
insert into shop_item (name,price)
    -> values ('wanmei','70'),('mihoyo',80);
```

```text
Query OK, 2 rows affected (0.026 sec)
Records: 2  Duplicates: 0  Warnings: 0
```

## 更新数据

千万不能忘记 where ，否则会更新所有数据，千万注意

```sql
update shop_item
    -> set price = '180'
    -> where name = 'wanmei';
```

```text
+---------+-------+
| name    | price |
+---------+-------+
| navel   | 80    |
| yuzu    | 160   |
| tencent | 140   |
| netease | 120   |
| wanmei  | 180   |
| mihoyo  | 80    |
+---------+-------+
```

## 删除数据

同样不要忘记 where,否则会删除所有数据

```sql
delete from shop_item
    -> where price >= 160;
```

```text
Query OK, 2 rows affected (0.004 sec)
```
