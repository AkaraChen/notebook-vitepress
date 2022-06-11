# React

## 开始前的说明

本文假定你跟我一样，学过 `Vue||Angular`，同时具有以下必备的知识：

1. 函数和箭头函数（ES6）
2. 对象
3. 数组
4. 解构赋值（ES6）
5. 模板字符串（ES5）
6. 条件运算符
7. ESM

## Components

```jsx
function Header() {
  return <h1>Hello,React!</h1>
}

function HomePage() {
  return (
    <div>
      <Header />
    </div>
  )
}

ReactDOM.render(<HomePage />, document.getElementByID("app"))
```

这不是合法的 JavaScript 代码，而是 JSX，因此无法直接在浏览器中运行，需要使用 babel 转译，由于 React 和 Next.js 都提供了 CLI 用于配置开发环境，所以这里不多提了。

## Props

```jsx
function Header({ title }) {
  return <h1>{title ? title : 'Example'}</h1>
}

function Page() {
  return (
    <div>
      <Header title="JSX"/>
    </div>
  )
}
```

太简单了，没啥好说的

## 渲染列表

```jsx
function HomePage() {
    const list = ['a','b','c'];
    return (
      { list.map(item => (
        <li key={item}> {item} </li>
      ))}
    )
}
```

## Click Function

```jsx
function HomePage() {
  //    ...
  function handleClick() {
    console.log('increment like count')
  }

  return (
    <div>
      <button onClick={handleClick}>Like</button>
    </div>
  )
}
```

## React 的两种写法

### Class Component

```jsx
class App extends React.Component {
  render() {
    return (
      <h1>Hello,World!</h1>
    );
  }
}
```

### Function Component

```jsx
const App = () => {
    return <h1>Hello,World!<h1>
}
```

Class Component 是经典范式，在 React 17 后逐渐被 Function Component 取代，Function Component 的显著特点是大量使用形如 `useEffect` 这种 Hooks，写法上更精炼一些

React 内容暂时结束，今天累了，明天正式开始 Next.js
