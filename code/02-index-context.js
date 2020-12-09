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
    return <div theme={this.contextTheme}></div>;
  }
}
