## 组件

> 组件，从概念上来讲类似于 Javascript 的函数，它接受任意个的入参（即 props），并返回描述页面的内容的 React 元素

### 函数组件

```jsx
function Welcome(props) {
  return <h1>hello {props.name}</h1>;
}
```

### class 组件

```jsx
class Welcome extends React.Component {
  render() {
    return <h1>hello {this.props.name}</h1>;
  }
}
```

### 渲染组件

```jsx
function Welcome(props) {
  return <h1>hello {props.name}</h1>;
}

const element = <Welcome name="zh" />;
ReactDOM.render(element, doucment.getElementById("root"));
```

#### 渲染组件的过程

- 调用 `ReactDOM.render()` 函数，并传入 `<Welcome name='zh' />` 作为参数
- `React` 调用 `Welcome` 组件，并将 `{name:'zh'}` 作为 `props` 传入
- `Welcome` 组件将 `<h1>hello zh</h1>` 作为元素返回
- `ReactDOM` 将 `DOM` 高效的更新为 `<h1>hello zh</h1>`

### 组合组件

```jsx
function Welcome(props) {
  return <h1>hello {props.name}</h1>;
}

function App() {
  return (
    <div>
      <Welcome name="zh" />
      <Welcomw name="hui" />
    </div>
  );
}

ReactDOM.render(<App />, doucment.getElementById("root"));
```

### props 的只读性

> 组件无论是使用函数声明汉是通过 class 声明，都不能修改自身的 props

```js
function sum(a, b) {
  return a + b;
}
```

这样的函数被成为纯函数，因为该函数不会尝试修改入参，且对此调用下传入相同的参数始终返回相同的结果

**所有 React 组件都必须向纯函数一样保护他们的 props 不被修改**
