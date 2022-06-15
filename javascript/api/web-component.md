# Web Component

前几天看到云游君的 [从零开始写一个 Web Component](https://www.yunyoujun.cn/posts/how-to-write-a-web-component/)，觉得这个玩意很有意思，然而我不想从框架开始学，于是就找教程写原生 Web Component 组件，现在学习完了记录一下方便以后使用。

## What & Why

前端的发展方向就是组件，现在主流的前端三大框架都是组件框架，谷歌自然也想用 Chrome 推行自己的原生组件，这个原生组件就是 Web Component。到目前 [Can I use](https://caniuse.com/?search=web%20component) 的统计显示 92%+ 的用户的浏览器支持 Web Component，现在已经能放心用了。

## Hello, World

```js
class MyCard extends HTMLElement {
  constructor() {
    super();
    let container = document.createElement("div");
    let para = document.createElement("p");
    para.innerText = "Hello, Web Component!";
    container.appendChild(para);
    this.append(container);
  }
}

window.customElements.define("my-card", MyCard);
```

然后在 HTML 里 `<my-card />` 就行了，这就是最简实现。然而这个最简实现有些繁琐，习惯编写声明式 UI 的大佬肯定是忍不了这种堪称生产力倒退的逆天玩意，所以浏览器也提供了模板写法。

## 模板写法

```js
class YetAnotherCard extends HTMLElement {
  constructor() {
    super();
    let templateElement = document.getElementById("yet-another-card");
    this.appendChild(templateElement.content.cloneNode(true));
  }
}

window.customElements.define("yet-another-card", YetAnotherCard);
```

```html
<template id="yet-another-card">
    <p>Yet Another Card</p>
</template>
<yet-another-card />
```

template 元素默认在浏览器中是不显示的，所以我们克隆了 template 的所有子节点到我们的 Web Component，这样也就算是实现了模板功能。

## 使用 Props

```js
class UseAttribute extends HTMLElement {
  constructor() {
    super();
    let templateElement = document.getElementById("use-attribute");
    let content = templateElement.content.cloneNode(true);
    content.getElementById("text").innerText = this.getAttribute("text");
    this.appendChild(content);
  }
}

window.customElements.define("use-attribute", UseAttribute);
```

```html
<use-attribute text="lorem"></use-attribute>
```

就完全用 jsdom 的 API 完成，简单好用，不用多学一堆新 API。

## 添加样式

你可能注意到，Web Component 现在是没有样式的，因为 Web Component 是样式隔离的，这样才能最大程度上的封装，vue 的 scoped 属性也是干这个的，然而没法子完全隔离。

想要添加样式很简单，就简单在 template 加一个 style 标签就行。

不过有个好消息，UnoCSS 支持 Web Component，因此用 Vite 写一个 Web Component 库是又快又爽。就这么简单配置一下就能跑。

```shell
yarn create vite
code myproject
```

```js
// vite.config.ts
import Unocss from '@unocss/vite'

export default {
  plugins: [
    Unocss({
      mode: "shadow-dom"
    }),
  ],
}
```

然后在模板里这么引入 UnoCSS

```html
<template>
    <style>@unocss-placeholder</style>
</template>
```

就大功告成了，舒适得很。

## 结尾

讲到这，Web Component 好像就解释完了，这样原生开发肯定还是没有框架方便的，但是胜在简单实用，应付些小组件还是很舒服的，尤其是这种 Web Components 可以用在任何项目中（包括 Vue、 React），说起来 Vue 3.2 也提供了导出 Web Component 的方案，感觉过几天可以倒腾着试一下。
