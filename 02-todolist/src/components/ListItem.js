import React from "react";
import { connect } from "react-redux";

import { List } from "antd";

import * as actionCreators from "../store/actionCreator";

class ListItem extends React.Component {
  render() {
    const { list } = this.props;
    return (
      <List
        bordered
        dataSource={list}
        renderItem={(item) => <List.Item>{item.text}</List.Item>}
      />
    );
  }
  // 组件挂载完成之后开始请求数据
  componentDidMount() {
    this.props.initListData();
  }
}

// 将 state 中的数据映射到 props 中
const mapStateToProps = (state) => {
  return {
    list: state.list,
  };
};

// 这里定义一些方法，这些方法执行时触发 dispatch 提交 action
const mapPropToState = (dispatch) => {
  return {
    // 初次打开时从网络中加载数据
    initListData() {
      dispatch(actionCreators.InitData());
    },
  };
};

export default connect(mapStateToProps, mapPropToState)(ListItem);
