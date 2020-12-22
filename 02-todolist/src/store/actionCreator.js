/**
 * 存储所有的 action 对象或函数方法
 */

import axios from "axios";
import * as actionTypes from "./actionTypes";

export const ChangInputValue = (data) => ({
  type: actionTypes.CHANG_INPUT_VALUE,
  data,
});

export const AddItem = (data) => ({
  type: actionTypes.ADD_ITEM,
  data,
});

const InitList = (data) => ({
  type: actionTypes.INIT_DATA,
  data,
});

/**
 * 默认情况下 action 只能是一个对象，
 * 在使用 redux-thunk 之后，action 可以是一个函数
 * 函数内可以执行一些异步的操作（请求 api接口获取数据）
 * 在异步执行完成后提交 action
 */
export const InitData = () => {
  return (dispatch) => {
    axios.get("/api/list.json").then((res) => {
      dispatch(InitList(res.data));
    });
  };
};
