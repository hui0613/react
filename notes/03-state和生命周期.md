## State

**State 与 props 类似，但是 state 是私有的，并且完全受控于当前控件**

### 实现一个时钟组件

```jsx
class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = { date: new Date() };
  }

  /**
   * 该方法会在组件已经渲染到DOM中后运行
   */
  componentDidMount() {
    this.timerID = setInterval(() => this.tick(), 1000);
  }

  /**
   * 组件将被卸载时清除
   */
  componentWillUnmount() {}

  tick() {
    // 使用 setDate 来更新 state 中的数据
    this.setState({
      date: new Date(),
    });
  }

  render() {
    return (
      <div>
        <div>hello world</div>
        <h2>It is {this.state.date.toLocaleTimeString()}</h2>
      </div>
    );
  }
}

ReactDOM.render(<Clock />, document.getElementById("root"));
```

### state 的使用

- 不要直接的修改 `state` 中的数据，应该使用 `setState()` 方法
- 构造汉书是唯一可以制定 `this.state` 的地方
- State 的更新可能是异步的
  > 为了处于新能考虑， `React` 可能会将多个 `setSate()` 调用合并成一个调用
  > 要解决这个问题，可以让 `setState()` 接受一个函数而不是一个对象，该函数的第一个参数为 `state`，第二个参数则是更新是需要用到的 `props`
  ```jsx
  this.setState((state, props) => {
    counter: state.sounter + props.counter;
  });
  ```
- 数据是向下流动的
  > 不管是父组件还是子组件都无法知道某个组件是有状态的还是无状态的。也就是说组件中的 state 只有在该组件中才可以访问，其他组件都无法访问
  > 组件可以将自己的 state 作为 props 向子组件传递，子组件通过 props 接受父组件传递过来的参数。但是子组件不能知道该参数是来是父组件的 state、props 还是手动输入的。
