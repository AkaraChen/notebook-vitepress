# 实例

## 粘性定位

即 `position: sticky`，常用于固定的侧边栏，下面是固定侧边栏的最简实现：

```html
    <div class="container">
      <div class="col-main"></div>
      <aside class="col-sidebar">
        <div class="affix">
          <div class="submenu">
            <li><a href="http://">Home</a></li>
            <li><a href="http://">Coffee</a></li>
            <li><a href="http://">Simole</a></li>
            <li><a href="http://">Sticky</a></li>
            <li><a href="http://">Sidebar</a></li>
          </div>
        </div>
      </aside>
    </div>
```

```css
.container {
  display: flex;
  min-height: 200vh;
}

.col-main {
  flex: 80%;
}

.col-sidebar {
  flex: 20%;
}

.affix {
  position: sticky;
  top: 1em;
}

```

[![Edit sticky-sidebar](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/sticky-sidebar-0j8rtr?fontsize=14&hidenavigation=1&theme=dark)

## 实现下拉菜单

一开始都没想到可以纯 CSS 实现，实现起来也是非常简单的。

```html
    <div class="container">
      <nav>
        <div class="dropdown">
          <div class="dropdown-label">菜单▾</div>
          <div class="dropdown-menu">
            <ul class="submenu">
              <li><a href="#">Home</a></li>
              <li><a href="#">Coffee</a></li>
              <li><a href="#">Brewears</a></li>
              <li><a href="#">Specials</a></li>
              <li><a href="#">About us</a></li>
            </ul>
          </div>
        </div>
      </nav>
      <h1>Lorem</h1>
    </div>
```

```css
.container {
  width: 80%;
  max-width: 1000px;
  margin: 1em auto;
}

.dropdown {
  display: inline-block;
  position: relative;
}

.dropdown-label {
  padding: 0.5em 1.5em;
  border: 1px solid #ccc;
  background-color: #eee;
}

.dropdown-menu {
  display: none;
  position: absolute;
  left: 0;
  top: 2.1em;
  min-width: 100%;
  background-color: #eee;
}

.dropdown:hover .dropdown-menu {
  display: block;
}

.submenu {
  padding-left: 0;
  margin: 0;
  list-style-type: none;
  border: 1px solid #999;
}

.submenu > li + li {
  border-top: 1px solid #999;
}

.submenu > li > a {
  display: block;
  padding: 0.5em 1.5em;
  background-color: #eee;
  color: #369;
  text-decoration: none;
}

.submenu > li > a:hover {
  background-color: #fff;
}

```

[![Edit css-dropdown](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/css-dropdown-lggb9z?fontsize=14&hidenavigation=1&theme=dark)

实现原理跟对话框大同小异，都是把一部分东西隐藏了，然后等某个时机 `display: block` 这样子，简单摘一段核心逻辑：

```css
.dropdown:hover .dropdown-menu {
  display: block;
}
```

大意是，当鼠标放在 .dropdown 的时候，让 dropdown-menu 显示出来，理解了这个思路就能很轻松的实现了。

## 实现对话框

得了，又开始重学定位了，之前都学了个寄吧。

```html
<header class="top-banner">
      <div class="top-banner-inner">
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia
          quidem ut assumenda ad, tenetur atque. Cumque voluptatem non ab. Sit
          aliquid fuga laudantium, culpa deleniti enim fugit aliquam a
          accusamus?
        </p>
      </div>
    </header>
    <button onclick="show()">显示对话框</button>
    <div id="dialog">
      <div class="dialog-body">
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam aliquid
          incidunt et qui sint ad quasi corporis saepe labore ipsa non eveniet
          omnis est a, expedita mollitia ipsum eum voluptatum!
        </p>
        <button onclick="hide()" class="dialog-close">
          关闭对话框
        </button>
      </div>
    </div>
```

```css
#dialog {
  display: none;
}

button {
  padding: 0.5em 0.7em;
  border: 1px solid #8d8d8d;
  font-size: 1em;
}

.top-banner {
  padding: 1em 0;
  background-color: #ffd698;
}

.top-banner-inner {
  width: 80%;
  max-width: 1080px;
  margin: 0 auto;
}

.dialog-body {
  position: fixed;
  top: 3em;
  bottom: 3em;
  right: 3em;
  left: 3em;
  padding: 2em 3em;
  background-color: cadetblue;
  color: white;
  overflow: auto;
}

.dialog-close {
  position: absolute;
  right: 0.3em;
  top: 0.3em;
}

```

[![Edit css-dialog](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/css-dialog-4gfo9y?fontsize=14&hidenavigation=1&theme=dark)

简单讲下实现原理，这个对话框就是写一个 div，CSS 里写 `display: none`，然后通过 js 触发事件切换 `display: block` 和 `display: none` 来实现对话框显示和隐藏。

给对话框本体设置 `position: fixed`，设置 `top bottom left right` 为 3em，就实现了铺满全屏，留上下左右各 3em 的空隙。把关闭按钮移到右上角是靠的 `position: absolute`，针对父元素定位的，离右边和顶部各 0.3em。

## 半透明边框

[![Edit semi-transparent-border](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/semi-transparent-border-9xqhy9?fontsize=14&hidenavigation=1&theme=dark)

假如我们给父 div 添加一个蓝色背景，然后给子元素添加一个白色背景，并且再给子元素添加一个颜色为白色，透明度为 0.5 的边框，你以为子元素的边框灰变成白色和蓝色的间色，实际上结果就如同上面实例中的第一个 div 一样，因为白色透明边框直接因为底下是一个白色背景，变成跟白色背景没区别的颜色了，这当然是不合理的，这是因为在 CSS 中，元素的边框在元素的背景之上，即使元素的边框并不计入元素的长宽，非常离谱，这时候我们就需要指定一下元素背景的范围，这里使用 `background-clip: padding-box` 就能解决。

## 多重边框

[![Edit muity-border](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/shy-dream-riul09?fontsize=14&hidenavigation=1&theme=dark)

标准制定的时候有人申请要求 CSS 支持多重边框，被驳回了，但是我们可以用 `box-shadow` 实现一个类似的玩意。

```css
box-shadow: 0 0 0 10px #655, 0 0 0 20px pink;
```

`box-shadow` 支持创建任意数量的阴影，第一层投影位于最里层，之后依次向外延伸。因此第一层 10px 的边框，第二层就需要大于 10px 才能显示出来。由于边框可以无限叠加，你甚至可以在最后加上一层常规的投影。

## outline 属性

只需要两层边框的时候，那就 border 和  outline 一起用得了，outline 是类似 border 的属性，不过这玩意不会额外占用长宽。

## CSS 绘图：椭圆

border-radius 属性有两个鲜为人知的真相。

1. 不仅可以接收一个数值，也可以接收一个形似 `75px/25px` 这样的输入，可以分别指定宽高的圆角大小。
2. 可以接收百分比单位，基于元素的宽高计算

多说无益，看示例吧

[![Edit unruffled-lalande-2qkjgc](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/unruffled-lalande-2qkjgc?fontsize=14&hidenavigation=1&theme=dark)

## 倾斜按钮

[![Edit small-mountain-1syqc3](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/small-mountain-1syqc3?fontsize=14&hidenavigation=1&theme=dark)

想要实现按钮外边倾斜，文字不倾斜，通常通过嵌套一个元素实现，但是这样子弊端很多：不便 SEO，代码亢余等等，所以我们可以通过伪元素实现。

首先要实现在这个按钮上有一个跟他一样大小，位置相同的伪元素。

```css
button {
    /* 让伪元素参照按钮定位 */
    positon: relative;
    /* 背景透明，从而露出文字，而不遮住伪元素设置的背景 */
    background: transparent;
}

button::before {
    /* 先让元素有内容，好占个点 */
    content: '';
    /* 设置根据按钮定位，并整个跟按钮一样的大小 */
    position: relative;
    left: 0;
    right:0;
    top: 0;
    bottom: 0;
    /* 设置一下 y 轴，防止伪元素遮住文字 */
    z-index: -1;
}
```

然后给 `button::before` 设置 `transform` 就行了。

## 给元素切个角

嗯，渐变函数实现，现在由衷感觉 CSS 不是人能倒腾的东西。

```css
background: linear-gradient(-45deg,  transparent 15px, white 0)
```

同样的，我们想要实现砍掉多个角，就简单在背景里多加几个 `linear-gradient` 就行了

```css
background: 
linear-gradient(135deg, transparent 15px, white 0) top left,
linear-gradient(-135deg,transparent 15px, white 0) bottom right,
linear-gradient(-45deg,transparent 15px, white 0) bottom right,
linear-gradient(45deg,transparent 15px ,white 0) bottom left;
background-size: 50% 50%;
background-repeat: no-repeat;
```

不想要哪个角拿去删了就行，示例在这。

[![Edit corner](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/withered-wildflower-huplke?fontsize=14&hidenavigation=1&theme=dark)

但是很遗憾的是，CSS3 提供了属性替代这种做法，上面的代码只需下面简单两行属性就能解决

```css
border-radius: 15px;
corner-shape: bavel;
```

也不能说是白学了，不过确实有点...

## box-shadow 的绘制原理

假设我们有这么一行 CSS 代码：

```css
box-shadow: 2px 3px 4px black;
```

在浏览器中运行，发生了如下几件事：

1. 以该元素相同的尺寸和位置，花了一个 black 色的矩形
2. 把矩形向右移 2px，向下移 3px
3. 利用高斯模糊算法将元素进行 4px 的模糊处理
4. 切掉与元素重叠的部分

## 仅元素下方有阴影

我们可以使用 `box-shadow` 不为人知的第四个数值属性，来设置元素阴影的偏移：

```css
box-shadow: 2px 3px 4px black 4px
```

## 斑马条纹

常用在表格。

HTML 结构：`.table > .row*6`

```css
.table > .row {
  background: white;
}

.row:nth-child(2n + 0) {
  background: rgba(0, 0, 0, 0.1);
}
```

### 实践1：德国国旗

```css
.germany {
  height: 120px;
  width: 200px;
  background-image: linear-gradient(
    180deg,
    black 33%,
    red 33%,
    red 66%,
    #ffcc00 66%
  );
}
```

利用无限插入颜色节点的方式，我们可以设置其中一个位置放置两个颜色节点的渐变，来实现条纹效果，这里我给一个空 div 以宽高，绘制出了三个条纹组成的德国国旗。

### 实践2：带条纹的进度条

```css
.gradient-scrool {
  height: 1em;
  width: 400px;
  background-image: repeating-linear-gradient(
    -45deg,
    #57b,
    #57b 10px,
    #148 10px,
    #148 20px
  );
}
```

在实践1的基础上再进一步，用 `repeating-linear-gradient` 属性加上 10px 宽的条纹，实现了带条纹的进度条。

放一下上面几个代码的效果：

```html
    <button class="btn-gradient">测试按钮</button>
    <div class="germany"></div>
    <div class="gradient-scrool"></div>
```

```css
body > * + * {
  margin-top: 10px;
}

.btn-gradient {
  border: none;
  display: block;
  width: 20%;
  height: 40px;
  background-image: linear-gradient(135deg, #f5f7fa 0, #c3cfe2 100%);
  border-radius: 4px;
}

.germany {
  height: 120px;
  width: 200px;
  background-image: linear-gradient(
    180deg,
    black 33%,
    red 33%,
    red 66%,
    #ffcc00 66%
  );
}

.gradient-scrool {
  height: 1em;
  width: 400px;
  background-image: repeating-linear-gradient(
    -45deg,
    #57b,
    #57b 10px,
    #148 10px,
    #148 20px
  );
}
```

[![Edit linear-gradient](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/linear-gradient-0h5nmc?fontsize=14&hidenavigation=1&theme=dark)

### 实例1：拟物按钮

```css
.button {
  padding: 1em;
  border: 0;
  font-size: 0.8rem;
  color: white;
  border-radius: 0.5em;
  background-image: linear-gradient(to bottom, #57b, #148);
  box-shadow: 0.1em 0.1em 0.5em #124;
}

.button:active {
  box-shadow: inset 0 0 0.5em #124, inset 0 0.5em 1em rgba(0, 0, 0, 0.4);
}
```

实现了一个拟物风格的按钮，说实话是真的不好看。

### 实例2：扁平按钮

```css
.flat {
  padding: 1em;
  border: 0;
  color: white;
  background-color: #57b;
  font-size: 1em;
  padding: 0.6em;
  box-shadow: 0 0.2em 0.2em rgba(0, 0, 0, 0.15);
}

.flat:hover {
  background-color: #456ab6;
}

.flat:active {
  background-color: #148;
}

```

演示在这：

```html
    <button class="button">Go Fuck Yourself</button>
    <button class="flat">A Flat Button</button>
```

```css
.button {
  padding: 1em;
  border: 0;
  font-size: 0.8rem;
  color: white;
  border-radius: 0.5em;
  background-image: linear-gradient(to bottom, #57b, #148);
  box-shadow: 0.1em 0.1em 0.5em #124;
}

.button:active {
  box-shadow: inset 0 0 0.5em #124, inset 0 0.5em 1em rgba(0, 0, 0, 0.4);
}

.flat {
  padding: 1em;
  border: 0;
  color: white;
  background-color: #57b;
  font-size: 1em;
  padding: 0.6em;
  box-shadow: 0 0.2em 0.2em rgba(0, 0, 0, 0.15);
}

.flat:hover {
  background-color: #456ab6;
}

.flat:active {
  background-color: #148;
}

```

[![Edit shadow&gradient button](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/shadow-gradient-button-gxzkt4?fontsize=14&hidenavigation=1&theme=dark)
