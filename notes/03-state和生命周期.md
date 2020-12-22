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

- **不要直接的修改** `state` 中的数据，应该使用 `setState()` 方法

  - 修改 state 中引用类型数据

    - 数组
      使用数组的各种方法(不能影响原来的数组（push, splice, pop 等方法不可用，违反了 state 不可变）)得到一个新的数组，使用 setState 对 state 中的数组进行修改

    ```jsx
    this.setState({
      list: this.state.list.concat(100),
      list1: [...this.state.list1, 100],
    });
    ```

    - 对象
      对原有的对象进行拷贝得到一个新的对象，对新的对象进行数据修改之后在使用 setState 修改 state 中的对象数据

      ```jsx
      this.setState({}, state, {a：1000});
      ```

- 构造函数是**唯一**可以定义 `this.state` 的地方
  - 函数组件默认没有 `state`
- **State 的更新可能是异步的**

  - 直接使用 setState 是异步的
    证明 setState 是异步的

  ```js
  this.state = {
    count: 0,
  };
  this.setState({
    count: this.state.count + 1,
  });
  console.log(this.state.count); //0
  ```

  - 在 setTimeOut 中使用 setState 是同步的

  ```js
  this.state = {
    count: 0,
  };

  setTimeOut(() => {
    this.setState({
      count: this.state.count + 1,
    });
    console.log(this.state.count); // 1
  }, 0);
  ```

  - 自定义的 DOM 事件中使用 setState 是同步的

  ```js
  this.state = {
    count: 0,
  };
  document.addEventListener("click", () => {
    this.setState({
      count: this.state.count + 1,
    });
    console.log(this.state.count); // 1
  });
  ```

  > 为了处于新能考虑， `React` **可能会将多个 `setSate()` 调用合并成一个调用**

  > 要解决 setState 被合并的问题，可以让 `setState()` 接受一个函数而不是一个对象，该函数的第一个参数为 `state`，第二个参数则是更新是需要用到的 `props`

  ```jsx
  this.setState((state, props) => {
    return {
      counter: state.sounter + props.counter;
    }
  });
  ```

- 数据是向下流动的

  > 不管是父组件还是子组件都无法知道某个组件是有状态的还是无状态的。也就是说组件中的 state 只有在该组件中才可以访问，其他组件都无法访问

  > 组件可以将自己的 state 作为 props 向子组件传递，子组件通过 props 接受父组件传递过来的参数。但是子组件不能知道该参数是来是父组件的 state、props 还是手动输入的。

**当组件中的 `state` 数据或者 `props` 数据发生变化是，则会重新执行 `render` 函数,当父组件中的 render 函数被执行是，子组件的 render 函数也会被执行**

## 生命周期

### componentWillMount()

> 组件即将被挂在到页面上是执行 `componentWillMount()`,此时页面上还没有 DOM 结构,不可以操作 DOM

### render()

> 当组件中的 `state` 或者 `props` 数据发生改变,以及父组件的 render 函数重新执行是执行 render 函数.

当父组件的 `render` 函数被执行,但是数据并没有影响到子组件是,这时候重新渲染子组件就会造成性能的损耗

### componentDiDMount()

> 组件已经该在到页面上,生成了正式的 `DOM` 结构,可以在该函数中操作 `DOM` 元素

### shouldComponentUpdate()

> 组件被更新之前会执行,该函数需要一个返回值,若返回值为 `false` ,则组件不会被更新,否则更新组件

在函数中判断,当父组件的 `render` 函数被重新执行时,传入的 `props` 是否发生了改变,若没有发生改变,则返回 `false`,阻止子组件的重新渲染,提升性能

### componentWillUpdate()

> 组件被更新之前, `shouldComponentUpdate()` 之后执行,若 `shouldComponentUpdate()` 返回值为 `false` ,则该函数不会被执行,该函数执行之后,执行 `render` 函数更新组件

### componentDidUpdate()

> 组件更新完成之后执行

### componentWillReceiveProps()

> 当一个组件从父组件接受参数,父组件中的 render 函数重新执行,则该函数则会被执行.
> **若当前组件之前不存在与父组件中,则父组件的 render 函数执行是不会触发该函数的执行**

### componentWillUnmount()

> 当组件即将从页面中移除是会执行该函数
