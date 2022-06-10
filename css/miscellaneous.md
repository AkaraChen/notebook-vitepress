# 杂项

## 层叠

其实就是优先级问题，有些 CSS 样式是重叠的，此时要判断哪个样式优先级更高，只需要记住一个法则：选择的越细致，优先级越高，所以 ID 选择器优先级比类选择器和标签选择器高，因为 ID 在标准的 HTML 文档里是唯一的。作用在同一元素的，选择层级多的肯定比选择层级少的优先级高，因为选择地更细致。同样的，内联样式比 style 标签和 link 引入的外部 CSS 优先级更高，因为内联样式是你针对这个 HTML 文档写的，选择更细致。如果实在都一样，那后出现的优先级更高。同时还有一个意外，`!important`，这个是 CSS 自己开的后门，用于应对边缘情况的。我们一般称生效的属性为`层叠值`。

看到层叠的规则，你应该能明白，不能随便就用一些优先级大的选择器，否则你之后再做更改的时候就无从下手了，找不到更大的选择器了！所以应该少用 ID 选择器和 `!important`。同样的，不要在组件库里加入内联代码，这样会强制使用组件库的开发者全盘接受这个属性，然后这些开发者就需要大量添加 `!important` 了。

### 链接样式书写顺序

因为层叠的关系，有时候你鼠标悬停在一个已经点击过的链接上，`:hover` 和 `:visited` 这两个伪元素选择器会同时生效，然而样式不能同时生效，具体怎么表现我懒得深究，因为我找到了解决方案。

记忆口诀：LoVe/HAte，`link>visited>hover>active`，依次书写就能规避这些问题。

## 继承

如果一个元素的某个属性没有层叠值，那会默认从某个祖先元素那里继承，一环套一环，递归向上找。就比如很多人的习惯，`body{font-family:sans}`，就是利用了继承，但是肯定不是所有东西都会继承，要是给一个 div 上了 float，里头所有元素都上了 float，那就无了。通常能继承的都是些字体设置、列表属性、表格自带的边框等等。

### 强制继承

字面意思，有时候实在想继承祖先元素的值，那就用 `inherit` 关键字，感觉可以用在 `p` 和 `span` 这种情况。

## 简写属性

就像 `border` `font` `margin` 这种，就是简写元素，如果其中有一项你没填写，那会直接清空这个没填写的样式，<del>试图把我激怒</del>可能会导致怪异的行为。有时候你写这些简写属性，像 `font`，属性顺序能随便写，因为浏览器自己知道你什么意思，但是 `margin` 这种四（两）个都是填长度的，如果写错顺序浏览器是不能帮你修正的，所以有时候要记清这些东西。边距的那俩属性的顺序是 `上右下左`，就是顺时针，如果只传入俩值，那就是 `水平-垂直`。

## 变量

```css
:root {
    --main-font: sans-serif；
}

p {
    font-family: var(--main-font)
}
```

定义变量就是在属性名前面加 `--`，调用就是 `var(变量名)` 这样，同时变量也是有作用域的，也是有层叠值的。

## box-sizing

先回想一个现象，你定义了两个 div，一个 `width:70%`，一个 `width:30%`，并且向左浮动，然而这两个 div 并不会在同一行显示，即使他们加起来的 `width` 也没到 100%，但就是折行显示了，这是因为他们实际上的宽度大于 100% 了，因为 width 指定的只是内容宽高，或者说是张鑫旭所说的内在盒子的宽高，并没有计算边距和边框所占的宽高，所以实际宽度大于了 100%。这时候就需要用到 `box-sizing` 属性了，`box-sizing` 的默认值是 `content-box`，可能你已经猜出这个属性的作用了，是的，就是决定 `width` 和 `height` 按照什么计算，只要改成 `box-sizing:border-box` 就能让宽高计算的时候默认带上边框和边距了。

这个属性可以直接写在父级元素，让元素自己继承，据书中说这更稳健：

```css
:root {
    box-sizing: border-box;
}

*,::before,::after {
    box-sizing: inherit;
}
```

简单写了个示例演示用昨天和今天学的东西写的双栏布局：

```html
<header>
    <h1>这是个标题</h1>
</header>
<div class="container">
  <main class="main">
    <h2>小标题</h2>
    <p>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur
      laboriosam, dolore aperiam cum blanditiis accusamus voluptas doloribus
      earum, pariatur fugit dolor provident, quasi ipsa enim vero velit
      autem. Magni, laboriosam.
    </p>
  </main>
  <aside class="sidebar">
      <a class="button-link">Follow us on Twitter</a>
      <a class="button-link">Follow us on Facebook</a>
  </aside>
</div>
```

```css
* {
  margin: 0;
  padding: 0;
}

:root {
  box-sizing: border-box;
}

*,
::after,
::before {
  box-sizing: inherit;
}

body {
  background-color: #eee;
  width: 95%;
  margin: auto;
}

header {
  color: #fff;
  background-color: #0072b0;
  border-radius: 0.5em;
  padding: 1em;
  margin: 1em 0;
}

.main {
  float: left;
  width: 75%;
  background-color: #fff;
  border-radius: 0.5em;
  padding: 1em;
}

.sidebar {
  float: left;
  /* 注意这里，减去了 1em，后面补上了 */
  width: calc(25% - 1em);
  margin-left: 1em;
  padding: 1.5em;
  background-color: #fff;
  border-radius: 0.5em;
}

.main > h2,
.main > p {
  line-height: 1.5em;
}

.button-link {
  display: block;
  padding: 0.5em;
  color: #fff;
  background-color: #0090c9;
  text-align: center;
  text-decoration: none;
}

.button-link + .button-link {
  margin-top: 1em;
}

```

[![Edit box-two-row-float](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/box-two-row-float-qquq67?fontsize=14&hidenavigation=1&theme=dark)

## 等高列的实现

等高列的实现是可以用表格布局实现的，但是那玩意看着太 `hack`了，感觉用着实在不舒服，所以这里只记 `flex` 布局的法子了。嗯，也没啥可说的，就把需要等高的俩元素，放在一个 flex 容器里头，记得删掉浮动相关代码，加点昨天记的属性就可以了。

## 响应式设计

响应式设计的三大原则：

1. **移动优先**：并非把所有东西优先加在移动端，而是在实现桌面布局前先构建移动版的布局
2. **@media规则**：使用这个样式规则，可以为不同大小的视口定制样式
3. **流式布局**：这种方式允许容器根据视口宽度缩放尺寸

移动端网页有很多限制：空间小、速度慢（有设备慢也有网速慢），交互方式也很不一样，大多数的交互都不如电脑便利，如果一开始就设计一个包含所有交互的网站，然后再根据移动设备的限制来制约网站的功能，那么一般会以失败告终。而移动优先的方式会让你一开始就想着这些限制，因此一旦将移动端的体验做好了，就可以用渐进增强的方式为大屏用户增强体验。

## 层叠上下文

当一个页面定位多个元素的时候，元素可能会重叠，有时候这并不是你预期的，我们先来讲下层叠上下文的特性。

浏览器将 HTML 解析为 DOM 的同时还创建了另一个树形结构，叫做渲染树，代表哦了每个元素的视觉样式和位置，同时还决定浏览器绘制元素的顺序，顺序很重要，因为如果元素正好重叠，后绘制的元素会出现在先绘制的元素前面。然而这些顺序有时候并不能随便改变，所以这时候我们就需要 `z-index` 属性了。

`z-index` 的属性值可以是任意整数，无论正负，表示 xyz 坐标系的 z 轴，`z-index` 值较高的元素在上边，反之在下边，使用很简单，但是如果不好好管理，比如某些人瞎设置 9999 这种值，可能会导致难以维护的项目出现。我们可以用变量记录 `z-index`，下面是示例代码。

```css
--z-nav: 200;
--z-dropdown1: 300;

.nav {
  z-index: --z-nav;
}

.dropdown {
  z-index: --z-dropdown;
}
```
