# 变换与动画

## 变换

变换大致有那么几种方式：旋转、平移、缩放、倾斜，使用形如 `transform: rotate(90geg)` 这种格式应用到元素上，各种方式的详细解释如下：

1. 旋转（rotate）：元素绕着一个轴心转动一定角度，需要传入角度
2. 平移（translate）：元素向上下左右各个方向移动，需要传入长度，类似 margin
3. 缩放（scale）：缩小或者放大元素，需要输入数字，输入0.5就是缩小一倍
4. 倾斜（skew）：使元素变形，顶部滑向一个方向，底部滑向相反方向，类似长方形变成平行四边形，同样是输入角度

示例如下，很简单的玩意就不整别的了：

```html
<div class="card">
  <img src="https://pic.akr.moe/20220322083143.png" alt="" />
  <h4>Hello,World!</h4>
  <p>
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolorum
  </p>
</div>
```

```css
img {
  max-width: 100%;
}

.card {
  padding: 0.5em;
  margin: 50px auto;
  background-color: white;
  max-width: 300px;
  transform: rotate(15deg);
}

```

[![Edit transform](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/transform-yxxxhf?fontsize=14&hidenavigation=1&theme=dark)

### 基点

变换是围绕着基点完成的，基点是旋转的轴心，也是倾斜和缩放开始的地方，而平移则是个意外。

默认情况下，基点是元素的中心，但是可以通过 `transform-origin` 属性改变基点位置，可选值可以是 `left center right` 和 `top center bottom` 的随机组合，也可以是百分比或是 px、em。

### 多重变换

`transform` 是支持传入多个函数的，所以我们可以直接传入多个值直接使用多重变换

## 实例：菜单

```html
    <header>
      <h1 class="page-header">改变窗口宽度试试</h1>
      <nav class="main-nav">
        <ul class="nav-links">
          <li>
            <a href="#"
              ><img src="" alt="" /><span class="nav-links__lable"
                >Home</span
              ></a
            >
          </li>
          <li>
            <a href="#"
              ><img src="" alt="" /><span class="nav-links__lable"
                >Event</span
              ></a
            >
          </li>
          <li>
            <a href="#"
              ><img src="" alt="" /><span class="nav-links__lable"
                >Member</span
              ></a
            >
          </li>
          <li>
            <a href="h=#"
              ><img src="" alt="" /><span class="nav-links__lable"
                >About</span
              ></a
            >
          </li>
        </ul>
      </nav>
    </header>
```

```css
html {
  box-sizing: border-box;
}

*,
*::before,
*::after {
  box-sizing: inherit;
}

body {
  line-height: 1.4;
  margin: 0;
  min-height: 100vh;
}

img {
  max-width: 100%;
}

.page-header {
  margin: 0;
  padding: 1rem;
}

@media (min-width: 30em) {
  .page-header {
    padding: 2rem 2rem 3rem;
  }
}

.nav-links {
  display: flex;
  justify-content: space-around;
  margin-top: 0;
  margin-bottom: 1rem;
  padding: 0 1rem;
  list-style: none;
}

.nav-links > li + li {
  margin-left: 0.8em;
}

.nav-links > li > a {
  display: block;
  padding: 0.8em 0;
  font-size: 0.8rem;
  text-decoration: none;
  color: black;
  text-transform: uppercase;
  letter-spacing: 0.06em;
}

.nav-links__icon {
  height: 1.5em;
  width: 1.5em;
  vertical-align: -0.2em;
}

.nav-links > li > a:hover {
  color: aquamarine;
}

@media (min-width: 30em) {
  .main-nav {
    position: fixed;
    top: 8.25rem;
    left: 0;
    z-index: 10;
    border-top-left-radius: 0.5em;
    border-bottom-right-radius: 0.5em;
  }
}

@media (min-width: 30em) {
  .nav-links {
    display: block;
  }
  .nav-links > li + li {
    margin-left: 0;
  }

  .nav-links__label {
    margin-left: 1em;
  }
}

```

[![Edit transform-menu](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/transform-menu-0xs428?fontsize=14&hidenavigation=1&theme=dark)

## 过渡

过渡是由一系列 `transition-*` 属性来实现的。如果某个元素设置了过渡，那么当它的属性值发生变化的时候，不会直接变成新值，而是使用过渡效果。

相关属性如下：

1. `transition-property`：指定哪些属性使用过渡，可选值有 `none`、`all`、`IDENT`，分别代表着没有过渡动画，所有属性都表现出过渡动画，第三个是指定特定属性。
2. `transition-duration`：指定过渡动画的持续实践
3. `transition`：包括上面的俩属性，还包括了一大堆我懒得记的属性。

```css
transition: 0.5s all linear 0.3s;
```

这条属性的 `linear` 代表动画的速度曲线，`linear` 的意思是平滑曲线，还有几个可选值：

1. ease：先快后慢
2. ease-in：开头处更快，结尾处减速
3. ease-out：开头慢结尾快
4. ease-in-out：开头慢、中间快和结尾慢

## 动画

同样都是让一个元素发生平滑过渡，动画比过渡更精细，原理上，浏览器中的动画跟 flash 动画是类似的，定义一个起始点（第一帧）和结束点（最后一帧），浏览器计算其中所有的中间值，使得元素在这些值之间平滑变换。

看看示例吧，语法还是很易懂的

[![Edit animation](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/animation-qwvi35?fontsize=14&hidenavigation=1&theme=dark)

```css
@keyframes over-and-back {
  0% {
    transform: translate(0);
  }

  50% {
    transform: scale(1.5);
  }

  100% {
    transform: translate(0);
  }
}

.box {
  position: sticky;
  margin: auto;
  border-radius: 50px;
  left: 50%-100px;
  margin-top: 50px;
  background-color: gray;
  width: 50px;
  height: 50px;
  animation: over-and-back 2s ease-in-out infinite;
}

```

语法一看就懂了。

## 结局撒花

书看完了，CSS 学习可能要告一段落了。
