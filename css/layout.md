# 布局

## 浮动

浮动最初的初衷并不是用于页面布局，但是大家也看到了，浮动在布局方面的表现十分优秀，然而，它最初是用于图文混排的，简单写了个示例，看看就行，这不是重点。

```html
<img
  width="40%"
  src="https://pic.akr.moe/03ce54571c569adbe2a1a66a9148d00b21d90394.jpg%40942w_531h_progressive.webp"
/>
<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim harum sit</p>
```

```css
img {
  float: left;
  margin-right: 10px;
}
```

[![Edit float-origin-use](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/float-origin-use-cns0jr?fontsize=14&hidenavigation=1&theme=dark)

浮动的作用是，让一个元素在标准流中消失，然后移动到`父元素`的左边或右边，文字会在浮动的元素旁边环绕，但是其他元素会被浮动元素盖住。

### 浮动实现导航栏示例

```html
<ul class="nav">
  <li><a href="#">HTML/CSS</a></li>
  <li><a href="#">Browser Side</a></li>
  <li><a href="#">Server Side</a></li>
  <li><a href="#">Programming</a></li>
  <li><a href="#">XML</a></li>
  <li><a href="#">Web Building</a></li>
  <li><a href="#">Referer</a></li>
</ul>
```

```css
* {
  margin: 0;
  padding: 0;
}

.nav {
  width: 100%;
  height: 3em;
  background-color: gainsboro;
  overflow: hidden;
}

.nav li {
  padding: 0 10px;
  list-style: none;
  float: left;
  line-height: 3em;
}

.nav a {
  display: block;
  text-decoration: none;
  color: black;
}

.nav li:hover {
  background-color: black;
}

.nav a:hover {
  color: white;
}

```

[![Edit float-navbar](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/float-navbar-82wrld?fontsize=14&hidenavigation=1&theme=dark)

实现起来难度其实不难，主要是需要掌握 trick，接下来会逐行讲解如何实现的。

HTML 结构大致如下：`ul.nav => (li => a) * 7`

`*{margin:0;padding:0}` 这个是清空浏览器的默认样式，防止浏览器误导我们。然后给 `.nav` 上宽度、高度、背景颜色，并设置 `overflow:hidden` 防止列表项溢出。然后选中 `.nav li`，让所有 li 向左浮动，并设置 `line-height` 为 `.nav` 的高度，这样文字就能垂直居中了，然后设置左右边距，并清除列表样式。再选中 `.nav a`，把它改成块级元素，这样就能继承父元素 `li` 的宽高，让 a 元素铺满，然后简单设置下文本样式。最后，再根据鼠标放在 li 上的情况写点样式，于是，这个导航栏就完成了，实在是非常简单。

### 浮动布局

然而，我们的页面上不会只有导航栏，所以我们需要继续学习浮动布局。

名词解释：

1. 高度塌陷：在一个 div 里没有元素撑开这个 div，或者说 float 的元素太高，最后 div 的高度比浮动元素低的情况就叫高度塌陷。
2. BFC：Block formatting context，块级格式化上下文，决定内部的块级元素如何布局。

高度塌陷是浮动布局遇到的最常见的问题，所以肯定也是有解决方案的，但是都很 `hack`，或者说真的寄吧弱智，因为浮动压根不是干这个的，有几个方法如下：

1. 给父元素设置 `float:left`，很离谱但确实有用，但是会让元素丢失宽度，解决了高度塌陷然后遇到宽度塌陷，笑死。
2. 给父元素设置 `display:inline-block`，同样丢失了宽度。
3. 给父元素设置 `overflow:hidden/auto`，真的很蠢，但是确实副作用小，高度和宽度都没丢失，能作为临时 solution。

这些方案无疑是不好的，因为还有更好的法子，但是目前的知识储备不够。

首先，设想一个场景，有一个浮动的 div 和一个不浮动的 div，两个元素必定会叠在一起，然而不浮动的 div 的文字会因为`文字默认环绕着浮动元素呈现`这一特性，文字会可能会脱离父元素，这自然是不好的，反直觉的，那么有没有一个东西能解决这个事情呢？是有的，`clear:left/right/both`，这个属性会清除浮动元素对当前元素的影响，值则是决定清除哪边的浮动，both 不是清除所有的浮动，而是清除影响大的那一侧。

那么说回解决高度塌陷，我们需要使用的正是 `clear:both`，我们当然不能在父元素里面再添加一个 div 再倒腾，那太 hack 了，我们只需要给父元素添加这样一个属性 `.father::after { content: '';display: block;clear: both;}` ，至于为什么要用 `display: block`，因为伪元素默认是内联元素，必须转成块级元素才有效，`content` 设置成空字符串才能添加伪元素的同时不影响布局，这就是目前主流的清除浮动解决方案。

有时候浮动元素跟父元素的外边距重叠了，导致了一些不符合预期的样式，这时候让父元素 `display: block` 就行，结合一下解决高度塌陷的方案，最终我们可以得出一个加在父元素的终极解决方案，只要看见浮动就可以直接加上去，就这么写：

```css
.clearfix::before,
.clearfix::afrer {
  content: '';
  display: table;
  clear: both;
}
```

这样的 `.clearfix` 类能解决大部分浮动的问题，以后出了事了直接用这个类就完了。

### 浮动布局实践

```html
<div class="container clearfix">
      <div class="component">
        <img
          src="https://t7.baidu.com/it/u=2621658848,3952322712&fm=193&f=GIF"
        />
        <div class="body">
          <h2>我徒弟呢</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Maiores
          </p>
        </div>
      </div>
      <div class="component">
        <img
          src="https://t7.baidu.com/it/u=2621658848,3952322712&fm=193&f=GIF"
        />
        <div class="body">
          <h2>我不到啊</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Maiores
          </p>
        </div>
      </div>
      <div class="component">
        <img
          src="https://t7.baidu.com/it/u=2621658848,3952322712&fm=193&f=GIF"
        />
        <div class="body">
          <h2>杀马特团长</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Maiores
          </p>
        </div>
      </div>
      <div class="component">
        <img
          src="https://t7.baidu.com/it/u=2621658848,3952322712&fm=193&f=GIF"
        />
        <div class="body">
          <h2>我跟你没完</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Maiores
          </p>
        </div>
      </div>
    </div>
```

```css
:root {
  box-sizing: border-box;
}

*,
::before,
::after {
  box-sizing: inherit;
  margin: 0;
  padding: 0;
}

.container {
  width: 90%;
  margin: 0 auto;
  background-color: skyblue;
}

.clearfix::before,
.clearfix::after {
  display: table;
  content: "";
  clear: both;
}

.component {
  float: left;
  width: 50%;
  padding: 0.75em;
}

.component img {
  float: left;
  width: 40%;
  margin-right: 10px;
}

.body {
  overflow: hidden;
}

```

[![Edit float-row](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/float-row-kvxwnm?fontsize=14&hidenavigation=1&theme=dark)

实现的太寄了，吐了，简单抽取一点核心逻辑说道说道，明天学学 grid 布局。

```css
/* 设置全局 border-box */
:root {
  box-sizing: border-box;
}

*,
::before,
::after {
  box-sizing: inherit;
}

/* 解决浮动的副作用 */
*,
.clearfix::before,
.clearfix::after {
  display: table;
  content: '';
  clear: both;
}

/* 让 body 里头的元素独立排版 */

.body {
  overflow: hidden;
}
```

## flex

### 优势

相比浮动布局，flex 的可预测性更好，还能提供更精细的控制，也能较为轻松地解决困扰浮动用户已久的垂直居中和等高列问题。

### 原则

当你指定一个容器为弹性容器之后，他的直接子元素变成了弹性子元素，弹性子元素会默认在同一行按照从左到右的顺序并排列，弹性元素像块容器一样填满可用宽度，但是弹性子元素不一定填满其弹性容器的宽度。弹性子元素高度相等，该高度由他们的内容决定。你也可以指定一个元素 `display: flex-inline`，虽然也是弹性容器，大部分特性跟普通弹性容器并无不同，但是他会跟其他行内元素一起流式排列，但是不会自动增长到 100% 的宽度。

弹性子元素按照主轴线排列，主轴的方向为 `主起点（左）` 到 `主终点（右）`，垂直于主轴的是副轴，方向从 `副起点（上）` 到 `副终点（下）`，使用`flex-direction`可以调转主轴副轴的方向，所以不能简单的认为主轴就是水平的，副轴就是垂直的。

### 实战

```html
<div class="container">
      <header>
        <h1>Ink</h1>
      </header>
      <nav>
        <ul class="nav">
          <li><a href="#">Home</a></li>
          <li><a href="#">Features</a></li>
          <li><a href="#">Pricing</a></li>
          <li><a href="#">Support</a></li>
          <li class="nav-right"><a href="#">About</a></li>
        </ul>
      </nav>
      <main class="flex">
        <div class="column-main tile">
          <h1>Some Title Here</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe rerum
            quo aut vitae repellat quod ut asperiores quia exercitationem
            laboriosam vero fuga, voluptatum nulla at sequi et molestiae
            temporibus. Dicta.
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo
            aperiam sint id ducimus unde ea repellat nihil animi consequatur
            necessitatibus. Asperiores ipsa id architecto nam ipsum harum
            veritatis saepe sint?
          </p>
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit.
            Consectetur laboriosam, officia maiores temporibus vero eveniet!
            Modi praesentium laudantium rem sed optio mollitia atque similique
            distinctio! Vel nihil quos officia aut.
          </p>
        </div>
        <div class="column-sidebar">
          <div class="tile">
            <form class="login-form">
              <h3>Login</h3>
              <p>
                <label for="username">Username</label>
                <input type="text" id="username" name="username" />
              </p>
              <p>
                <label for="password">Password</label>
                <input type="text" id="password" name="password" />
              </p>
              <button type="submit">Submit</button>
            </form>
          </div>
          <div class="tile centered">
            <h4>Starting at</h4>
            <div class="cost">
              <span class="cost-currency">$</span>
              <span class="cost-dollars">20</span>
              <span class="cost-cents">.00</span>
            </div>
            <a href="#" class="cta-button">Sign up</a>
          </div>
        </div>
      </main>
    </div>
```

```css
:root {
  box-sizing: border-box;
}

*,
::before,
::after {
  box-sizing: inherit;
  padding: 0;
  margin: 0;
}

body {
  margin-top: 20px;
  background-color: #709b90;
}

body * + * {
  margin-top: 1.5em;
}

.container {
  max-width: 1080px;
  margin: 0 auto;
}

.nav {
  display: flex;
  list-style-type: none;
  background-color: #5f4b44;
  padding: 0.5em;
  border-radius: 0.2em;
}

.nav > li {
  margin-top: 0;
}

.nav > li > a {
  display: block;
  padding: 0.5em 1em;
  background-color: #cc6b5a;
  color: white;
  text-decoration: none;
}

.nav > li + li {
  margin-left: 1.5em;
}

.nav > .nav-right {
  margin-left: auto;
}

.tile {
  padding: 1.5em;
  background-color: #fff;
}

.flex {
  display: flex;
}

.flex > * + * {
  margin-top: 0;
  margin-left: 1.5em;
}

.column-main {
  flex: 2;
}

.column-sidebar {
  flex: 1;
}

.login-form h3 {
  text-align: right;
}

.login-form input {
  display: block;
  width: 100%;
  margin-top: 0;
}

.login-form button {
  margin-top: 1em;
  background-color: #cc6b5a;
  padding: 0.5em 1em;
  border: none;
  color: #fff;
}

.centered {
  text-align: center;
}

.cost {
  display: flex;
  justify-content: center;
  align-items: center;
}

.cost > span {
  margin-top: 0;
}

.cost-currency {
  font-size: 2em;
}

.cost-dollars {
  font-size: 4em;
}

.cost-cents {
  font-size: 2em;
}

.cta-button {
  display: block;
  background-color: #cc6b5a;
  color: white;
  padding: 0.5em 1em;
  text-decoration: none;
}

```

[![Edit first-flex](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/first-flex-n6rb1y?fontsize=14&hidenavigation=1&theme=dark)

虽然这是一个很简单的布局，我用 PS 几分钟就能画出来，但是即使是这种页面，用浮动实现也是很难的，而且需要使用很多晦涩的 trick，但是我用 flex 布局则仅仅用了一百来行 CSS，我知道这依旧很多，但是比起浮动真的已经是个很大的进步了。

HTNL 结构就看 codesandbox 吧，简单讲讲 CSS。

里面有三处使用了 flex 布局：

1. 导航栏，想不到吧，flex 布局实现起来比浮动还简单的多
2. 主体内容和侧边栏的俩项目的排布用了 flex
3. 表示金钱的那串数字

不禁感叹，flex 布局真的是好全能，什么都能实现，接下来讲讲具体实现的细节。

首先是传统艺能，再挂一遍，强化记忆！！！

```css
:root {
  box-sizing: border-box;
}

*,
::before,
::after {
  box-sizing: inherit;
  padding: 0;
  margin: 0;
}
```

再就是实现的导航栏，这都是 flex 强项了，不用解释

```css
.nav {
  display: flex;
  list-style-type: none;
  background-color: #5f4b44;
  padding: 0.5em;
  border-radius: 0.2em;
}

.nav > li {
  margin-top: 0;
}

.nav > li > a {
  display: block;
  padding: 0.5em 1em;
  background-color: #cc6b5a;
  color: white;
  text-decoration: none;
}

.nav > li + li {
  margin-left: 1.5em;
}

.nav > .nav-right {
  margin-left: auto;
}
```

至于文章区域和侧边栏的 2：1 分割，则更简单：

```css
.flex {
  display: flex;
}

.flex > * + * {
  margin-top: 0;
  margin-left: 1.5em;
}

.column-main {
  flex: 2;
}

.column-sidebar {
  flex: 1;
}
```

首先设定导航栏之下的 main 是 flex 布局，然后简单设定下比例，再设定下两栏之间的间距，就这么轻松。

价格那个看似是大材小用，但是实际上也是 flex 布局的绝佳实践，就算只是三个 span 的垂直居中显示用浮动也是很困难的：

```css
.cost {
  display: flex;
  justify-content: center;
  align-items: center;
}

.cost > span {
  margin-top: 0;
}

.cost-currency {
  font-size: 2em;
}

.cost-dollars {
  font-size: 4em;
}

.cost-cents {
  font-size: 2em;
}
```

## Grid

### 先睹为快

跟 flex 类似，当你给一个父元素赋予 `display: grid` 的时候，父元素下的所有子元素就变成了网格元素。

```html
<div class="grid">
  <div class="a">a</div>
  <div class="b">b</div>
  <div class="c">c</div>
  <div class="d">d</div>
  <div class="e">e</div>
  <div class="f">f</div>
</div>
```

```css
.grid {
  display: grid;
  grid-template-columns: 1fr 3fr 2fr;
  grid-template-rows: 1fr 2fr;
  grid-gap: 0.5em;
}

.grid > * {
  background-color: darkgray;
  color: white;
  padding: 2em;
  border-radius: 0.5em;
}

```

[![Edit grid-simple](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/grid-simple-k87y4e?fontsize=14&hidenavigation=1&theme=dark)

上面的例子大家可以试着改改 `grid-template-columns` 和 `grid-template-rows`，实在是非常简单，简单到有种不真实的感觉，实在令人觉得感动。

`grid-template-columns` 和 `grid-template-rows` 支持一种新的单位，fr，代表每一列或者每一行的分数单位，`1fr 2fr 1fr` 代表三列或者三行按照 `1:2:1` 比例分割。当然你也可以用 px、em 等等单位，也可以混搭这些单位，比如 `300px 1fr 2fr` 这种，就是先左边是 300px，剩下的部分按照 1：2 分配。

`grid-gap` 属性定义了间距，特性跟 margin 这种是一样的。

### 名词解释

首先来点名词解释：

1. 网格线（grid line）：字面意思，就是网格之间的线，`grid-gap` 指定的间隔就放在网格线上。
2. 网格轨道（grid track）：相邻两条网格线之间的空间，或者说是一整行或者一整列。
3. 网格单元（grid cell）：网格上的单个空间
4. 网格区域（grid area）：网格上的矩形区域，可以是单个也可以是多个网格单元组成。

声明 `grid-template-column： 1fr 2fr 1fr` 的时候就定义了三个宽度比例为 1：2：1 的网格轨道。

### repeat 符号

在编写 CSS 的时候可以使用 `grid-template-column: repeat(4,auto)` 指代 `grid-template-column: auto auto auto auto`

### 高级布局

#### 直接针对网格线布局

```html
<div class="grid">
  <div class="t1">1</div>
  <div class="t2">2</div>
  <div class="t3">3</div>
  <div class="t4">4</div>
  <div class="t5">5</div>
  <div class="t6">6</div>
</div>
```

```css
.grid {
  display: grid;
  grid-gap: 0.5em;
}

.grid > * {
  padding: 0.5em;
  border-radius: 4px;
}

.t1 {
  background-color: aqua;
  grid-column: 1/1;
  grid-row: 1/2;
}

.t2 {
  background-color: bisque;
  grid-column: 2/4;
  grid-row: 1/2;
}

.t3 {
  background-color: cadetblue;
  grid-column: 4/4;
  grid-row: 1/2;
}

.t4 {
  background-color: chartreuse;
  grid-column: 1/3;
  grid-row: 2/4;
}

.t5 {
  background-color: cornflowerblue;
  grid-column: 3/5;
  grid-row: 2/3;
}

.t6 {
  background-color: deepskyblue;
  grid-column: 3/5;
  grid-row: 3/4;
}

```

[![Edit grid-complex](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/grid-complex-9fn4gf?fontsize=14&hidenavigation=1&theme=dark)

可以看到，我针对需要被布局的6个元素，添加了如下的属性

```css
.t1 {
  grid-column: 1/1;
  grid-row: 1/2;
}
```

`grid-column` 就是指定占网格的哪一列，`grid-row` 就是指定占网格的哪一行，斜线的左侧写从哪条线开始，右侧写到哪条线结束

此外，你甚至可以给网格线命名，写出这种逆天代码：

```css
.grid {
  display: grid;
  grid-template-columns:
    [left 左边] repeat(4, 1fr)
    [center 中间] repeat(4, 1fr)
    [right 右边] repeat(4, 1fr)
    [end 结束];
}

.t1 {
  grid-column: 左边 / 中间;
}

.t2 {
  grid-column: 中间 / 右边;
}

.t3 {
  grid-column: 右边 / 结束;
}

```

浏览器中也是能运行的：

```html
<div class="grid">
  <div class="t1">1</div>
  <div class="t2">2</div>
  <div class="t3">3</div>
</div>
```

```css
.grid {
  display: grid;
  grid-gap: 0.5em;
  grid-template-columns:
    [left 左边] repeat(4, 1fr)
    [center 中间] repeat(4, 1fr)
    [right 右边] repeat(4, 1fr)
    [end 结束];
}

.grid > * {
  padding: 0.5em;
  background-color: gray;
  color: #ffffff;
  border-radius: 4px;
}

.t1 {
  grid-column: 左边 / 中间;
}

.t2 {
  grid-column: 中间 / 右边;
}

.t3 {
  grid-column: 右边 / 结束;
}

```

[![Edit grid-clear](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/grid-clear-eqhtto?fontsize=14&hidenavigation=1&theme=dark)

`left` 和 `左边` 都是最左侧那条线的别名，你当然也可以写出诸如 `left-4 right-1` 这种的别名列表。

#### 直接针对网格区域布局

你甚至还可以给区域起别名，然后给元素指定一片区域：

```html
<div class="grid">
  <header>这是title</header>
  <nav>这是个nav</nav>
  <main>这是个main</main>
  <div class="sidebar-1">侧栏1</div>
  <div class="sidebar-2">侧栏2</div>
</div>
```

```css
.grid {
  display: grid;
  grid-template-areas: "title title" "nav nav" "main aside1" "main aside2";
  grid-template-columns: 2fr 1fr;
  grid-template-rows: repeat(4, auto);
  grid-gap: 0.5em;
}

.grid > * {
  background-color: gray;
  color: wheat;
  padding: 0.5em;
}

header {
  grid-area: title;
}

nav {
  grid-area: nav;
}

main {
  grid-area: main;
}

.sidebar-1 {
  grid-area: aside1;
}

.sidebar-2 {
  grid-area: aside2;
}

```

[![Edit grid-header-nav-main](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/grid-header-nav-main-xjz57x?fontsize=14&hidenavigation=1&theme=dark)

在父容器定义 `grid-template-areas`，在子元素里定义 `grid-area`，就能很轻松的布局。

### 显式轨道和隐式轨道

上面提到的轨道都是显式轨道，然而当你写 CSS 的时候指定了大于所定义的轨道外的轨道，就会自己创建一个隐式轨道，直到包含了这个元素。可以给隐式网格容器设置 `grid-auto-columns` 或是 `grid-auto-columns` 来给隐式网格轨道指定一个大小。
