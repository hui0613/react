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
