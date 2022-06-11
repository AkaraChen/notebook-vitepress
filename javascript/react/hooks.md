# Hooks

## State

Next.js 介绍这玩意的时候谜语人，翻了一下 React 文档搞明白了。

```jsx
const [count,setcount] = useState();

const handleClick = () => {
  setCount(count+1)
} 

const App = () => {
  return (
    <h1 onClick={handleClick}>{count}</h1>
  )
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);

```

第一行是解构赋值，后面的 `useState()` 返回了一个 Array，一个是 count 的引用，一个是 count 的 Setter，被分别赋值到了 count 和 setCount 中，然后就能像上面那样调用了，实现的效果是一个点击就会增加的 Counter，可以看出比 Vue 复杂了一些。

## Ref

说起 Ref 我就熟悉了，用起来自然也是很类似的。

```js
import { useRef } from 'react';
const ref = useRef(0);
console.log(ref.current) // 0
ref.current += 1;
console.log(ref.current) // 1
```

## Ref Best Practice

Ref 和 State 最大的差别无非两个：

1. State 会自动让页面更新，Ref 不会
2. Ref 可以直接改，State 需要用 Setter

由此可得，Ref 的最佳实践有：

1. 计时器
2. 存储和操作 DOM
3. 存储 JSX 不需要的对象

或者说，用于存储一些不影响渲染逻辑的值。

## useEffect

当 React 完成对 DOM 的更改后，React 会运行这个函数，因为他在组件内声明，因此可以访问组件的 props 和 state，语法如下

```jsx
import React, { useState,useEffect } from 'react';

function Example() {
    const [count, setCount] = useState(0);

    useEffect(() => {
        document.title = `You have clicked button for ${count} times`
    })

    return (
        <button onClick={() => setCount(count + 1)}>count is {count}</button>
    )
}
```

需要注意的是，有些时候，每次渲染后都执行 effect 可能会导致性能问题，这是个常见的需求，所以 React 当然也提供了对应的方案，只需要在 useEffect 中加入一个参数就能设定当什么变量更新时才执行 effect

```jsx
useEffect(() => {
    // something...
},[count])
```

## useReducer

在部分情况比 useState 更好用，语法如下

```jsx
const initialState = {count: 0};

function reducer(state, action) {
  switch (action.type) {
    case 'increment':
      return {count: state.count + 1};
    case 'decrement':
      return {count: state.count - 1};
    default:
      throw new Error();
  }
}

function Counter() {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <>
      <button onClick={() => dispatch({type: 'decrement'})}>减</button>
      Count: {state.count}
      <button onClick={() => dispatch({type: 'increment'})}>加</button>
    </>
  );
}
```

## Context

Context 设计的目的是共享一个全局的状态，就不用让嵌套的组件挨个用 Prop 传值，类似于 Vue 中的 Store。

```jsx
import React from 'react';

const ThemeContext = React.createContext('light');

class DisplayTheme extends React.Component{
  static contextType = ThemeContext;
  render() {
    return <h1>{this.context}</h1>
  }
}

export function App(props) {
  return (
    <ThemeContext.Provider value="dark">
    <div className='App'>
      <DisplayTheme />
    </div>
    </ThemeContext.Provider>
  );
}
```

我们首先需要用 `React.createContext` 创建 Context，通过 `<Context.Provider />`，我们可以很轻松的限定 Context 的作用域，只需要在组件里指定一个 `contextType`，React 会帮我们自动找到最近的 Provide 读取它的值。

## useContext

用 CodeSandbox 做 React Playground 修改了半天都没法正常跑，没法子就在本地用 create-react-app 新建了个工程，跑通了，麻麻的，在线环境你害人不浅

```jsx
import React, { useContext } from "react";
import ReactDOM from "react-dom";

const ThemeContext = React.createContext("light");

const DisplayTheme = () => {
  const Theme = useContext(ThemeContext);
  return <p>{Theme}</p>;
};

class App extends React.Component {
  render() {
    return (
      <ThemeContext.Provider value="dark">
        <DisplayTheme />
      </ThemeContext.Provider>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("container"));
```
