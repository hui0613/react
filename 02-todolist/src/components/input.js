import React from "react";
import { connect } from "react-redux";

import { FormInput } from "./inputStyled";

import * as actionCreators from "../store/actionCreator.js";

import { Input, Button } from "antd";

class InputCom extends React.Component {
  render() {
    return (
      <FormInput>
        <Input
          value={this.props.inputValue}
          onChange={this.props.changeInputValue}
        ></Input>
        <Button type="primary" onClick={this.props.addItem}>
          Add
        </Button>
      </FormInput>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    inputValue: state.inputValue,
  };
};

const mapPropToState = (dispatch) => {
  return {
    // 在输入框进行输入时，该方法被触发，触发指定的 action
    changeInputValue(e) {
      dispatch(actionCreators.ChangInputValue(e.target.value));
    },
    addItem() {
      dispatch(actionCreators.AddItem());
    },
  };
};

// 使用 connect 将组件和 store 进行绑定映射
export default connect(mapStateToProps, mapPropToState)(InputCom);
