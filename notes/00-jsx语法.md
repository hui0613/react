## JSX

> JSX 是一个 JavaScript 的语法扩展。

### 在 JSX 中嵌入表达式

在 JSX 中 {} 中可以嵌入任何有效的 JavaScript 表达式

```jsx
const name = "zh";
const element = <h1>Hello {name}</h1>;

ReactDOM.render(element, doucment.getElementById("root"));
```

### JSX 中嵌入原生 HTML

```jsx
const rawHTML = {
  __html: `<h1>title</h1>`, // 必须时这种格式
};

const render = <div> dangerouslySetInnerHTML={rawHTML}</div>;
```

### JSX 也是一个表达式

> 也就是所，可以将 JSX 作为函数的参数会这返回值来使用

### JSX 特定属性

使用引号来将属性指定为字符串变量

```jsx
const element = <div id="root"></div>;
```

也可以使用 {} 来插入一个 JavaScript 表达式

```jsx
const element = <div id={id}></div>;
```

**使用 {} 时，不要在外面添加引号，对于同一个属性，不能同时使用引号和 {}**

> 在 JSX 中，所有的属性使用 `camelCase`（小驼峰命名）来定义属性的名称，例如：JSX 中的 `class` 变成 `className`

### JSX 表示对象

下面两种方式代码是等效的

```jsx
const element = <h1 className="title">hello world</h1>;
```

```jsx
const element = React.createElement(
  "h1",
  { className: "title" },
  "hello world"
);
```
