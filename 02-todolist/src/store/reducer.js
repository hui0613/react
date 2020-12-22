/**
 *  reducer 在接受到 store 传递来的 action 时，对 action.type
 * 进行区分，进行相应的数据处理，最后将数据返回给 store
 */

import * as actionTypes from "./actionTypes.js";

// 定义一个默认的 state， 用于第一次调用 reducer 时进行数据初始化
const defaultState = {
  inputValue: "etst",
  list: [1, 2, 3],
};

/**
 * reducer 函数接受两个参数，
 *
 * @param {*} state  旧的 state，
 * @param {*} action sotre 传递来的 action， 根据 action.type 进行不同的数据处理
 *
 * 在进行数据处理时，state 不能被修改，只能返回一个新的 state 对象
 */
// eslint-disable-next-line import/no-anonymous-default-export
export default (state = defaultState, action) => {
  switch (action.type) {
    case actionTypes.CHANG_INPUT_VALUE:
      return Object.assign({}, state, { inputValue: action.data });
    case actionTypes.INIT_DATA:
      return Object.assign({}, state, { list: action.data });
    case actionTypes.ADD_ITEM:
      const newState = JSON.parse(JSON.stringify(state));
      newState.list.push({
        id: Math.random().toString(16).substr(3),
        text: state.inputValue,
      });
      newState.inputValue = "";
      return newState;
    default:
      break;
  }
  return state;
};
