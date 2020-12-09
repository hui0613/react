## Context

> 在简单的 React 应用中，数据是通过 props 属性自上而下进行传递的，若在组件树中存在多个组件公用一个数据，在进行 props 属性传递时是比较繁琐的。Context 提供了一种在组件之间共享数据的方式，而不必显示的通过组件树逐层传递 props

### 何时使用 Context

> 当某个数据对于一个组件树而言是`全局数据`时考虑使用 Context

```jsx
// Context 可以在不显示的使用 props 传值的情况下，是的所有的组件都能够使用数据

const ThemeContext = React.createContext("light");

class App extends React.Component {
  render() {
    /**
     * 使用一个 provider 来将当前的 theme 传递给以下的组件树
     * 无论组件树的深度多大，该组件树中的所有组件都能取得这个值
     */
    return (
      <ThemeContext.Provider value="dark">
        <Toobar></Toobar>
      </ThemeContext.Provider>
    );
  }
}

// 位于组件树中间位置的组件不需要在指明向下传递 theme 数据
class Toobar extends React.Component {
  render() {
    return (
      <div>
        <ThemeButton></ThemeButton>
      </div>
    );
  }
}

class ThemeButton extends React.Component {
  // reatct 会往上找到最近的 themeProvider，并使用该值
  static contextTheme = ThemeContext;
  render() {
    return <div theme={this.context}></div>;
  }
}
```

### 使用 Context 的考虑

使用 Context 会使得组件的复用性变差。如果仅仅是为了避免组件层层传值的问题，可以考虑使用`组件组合`

### API

- **React.createContext**
  > 创建一个 Context 对象，当组件树中的某个组件需要使用 Context 对象是，这个组件会从组件树中离自身最近的那个匹配的 Provider 中读取当前的 context 值

```jsx
const myContext = React.createContext(defaultValue);
```
