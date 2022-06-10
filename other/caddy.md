# Caddy

因为实在太粗略，瞥了一眼文档就结束了，就不算在学习笔记那里了。

## 为啥选了 Caddy

就图那个简单，简单写一个几行 Caddyfile 就顶 nginx 写十几行配置，这段时间在研究 docker，只希望有个能快速跑起来的 server 就行了，其他的东西不太想考虑了

## 安装

> 总感觉，要写成汉化精简版原版文档

### for Ubuntu/Debian

```bash
sudo apt install -y debian-keyring debian-archive-keyring apt-transport-https
curl -1sLf 'https://dl.cloudsmith.io/public/caddy/stable/gpg.key' | sudo tee /etc/apt/trusted.gpg.d/caddy-stable.asc
curl -1sLf 'https://dl.cloudsmith.io/public/caddy/stable/debian.deb.txt' | sudo tee /etc/apt/sources.list.d/caddy-stable.list
sudo apt update
sudo apt install caddy
```

### for Windows

```powershell
choco install caddy
```

## Hello,World

```bash
caddy run
```

然后你就会看到 caddy 占用了 2019 端口，打开 `localhost:2019/config` 就能看到你的配置文件 json 了

## 第一个 Caddyfile

Caddyfile 是让我放弃学习 nginx 的主要原因，因为这玩意实在太简洁了，简直隐藏了所有细节，令人感动。

> 学 Webserver 不学 Caddy，就像四大名著不看红楼梦，说明这个人文学造诣和自我修养不足，他理解不了这种内在的阳春白雪的高雅艺术‌​‌‌‌‌​‌‌‌‌‌‌​​‌‌‌​​‌‌，他只能看到外表的辞藻堆砌，参不透其中深奥的精神内核，他整个人的层次就卡在这里了，只能度过一个相对失败的人生  

那么现在来写一个 Caddyfile 看看？

```bash
mkdir caddy && cd caddy
touch Caddyfile && vim Caddyfile
```

然后写下

```text
:2015

respond "Hello, world!"
```

```bash
caddy start
```

然后 `GET http://localhost:2015` 就能看到一句 "Hello,World" 了，当我打开浏览器一看，我不禁惊呼 "真的这么快?"

## 部署静态网站

仅仅 respond "Hello,World" 肯定没法满足需求，但是好在 Caddy 部署静态网站也非常简单。

更改之前的 Caddyfile，将  `respond "Hello, world!"` 改成 `file_server` 即可。

当然目录下没有网站入口是不行的，好歹新建一个 `index.html` 吧。

最后，重载一下 Caddy

```bash
caddy reload
```

## 部署反向代理

反向代理则是 `reverse_proxy 127.0.0.1:7890`

## 下篇会讲点啥

1. 部署 PHP 网站

2. 修改配置文件(是的，我到现在也没找到更改配置文件的方法，也许是我看的不仔细吧)
