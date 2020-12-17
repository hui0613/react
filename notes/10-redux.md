## Store

> 使用 `createStore()` `API` 来创建 `store`

```js
import { createStore } from "redux";

const store = createStore();

export store;
```

## Action

> Action 是把数据从应用传到 store 的有效载荷，它是 store 数据的唯一来源，一般来说会通过 store.dispatch() 来将 action 传递到 store

```js
{
    type:"ADD_TODO",
    text:"TODO LIST"
}
```

Action 本质上是一个 JavaScript 对象，在 action 内必须有一个 type 字段来便是将要执行的动作，**应当尽量少的在 action 传递数据**

### 创建 Action

> **Action 创建函数就是创建 Action 的方法**，在 **Action 创建函数** 中只是简单的返回了一个 **Action** 对象

```jsx
function addItem(text) {
  return {
    // 对于 type，建议使用一个文件定义常量来导入使用
    type: "addItem",
    text,
  };
}
// 触发 dispatch 方法
dispatch(addItem("todoList"));
```

## Reducer

> Reducer 指定了应用状态的变化如何响应 actions 并发送 到 store 中，**`action` 只是描述了数据有发生改变，但是并没有描述数据是如何发生改变的**

### Action 处理

> reducer 是一个纯函数（接受相同的参数一定会有相同的结果输出），接受一个就的 action 和 state，并返回新的 state

```js
(state, action) => {};
```

不要在 reducer 中做以下操作

- 修改传入的参数
- 只有有副作用的操作，如 API 请求和路由跳转
- 调用非纯函数

```js
const defaultState = {
    list:[]
}
(state = defaultState,action) => {
    switch(action.type){
        // 依据不同的 type 值进行不同的操作
    }
    // 第一次执行是返回 state，进行初始化
    return state
}
```

- 不要尝试修改 state
- 在 action.type 位置的情况下，应当始终返回 state

### 拆分 reducer

> 当用用比较复杂是，对于 `state` 的数据，应当尽可能是使用单独的 `reducer` 来进行管理

对下面的代码进行优化

```js
function todoApp(state = initialState, action) {
  switch (action.type) {
    case SET_VISIBILITY_FILTER:
      return Object.assign({}, state, {
        visibilityFilter: action.filter,
      });
    case ADD_TODO:
      return Object.assign({}, state, {
        todos: [
          ...state.todos,
          {
            text: action.text,
            completed: false,
          },
        ],
      });
    case TOGGLE_TODO:
      return Object.assign({}, state, {
        todos: state.todos.map((todo, index) => {
          if (index === action.index) {
            return Object.assign({}, todo, {
              completed: !todo.completed,
            });
          }
          return todo;
        }),
      });
    default:
      return state;
  }
}
```

优化之后的代码

```js
function todos(state = [], action) {
  switch (action.type) {
    case ADD_TODO:
      return [
        ...state,
        {
          text: action.text,
          completed: false,
        },
      ];
    case TOGGLE_TODO:
      return state.map((todo, index) => {
        if (index === action.index) {
          return Object.assign({}, todo, {
            completed: !todo.completed,
          });
        }
        return todo;
      });
    default:
      return state;
  }
}

function todoApp(state = initialState, action) {
  switch (action.type) {
    case SET_VISIBILITY_FILTER:
      return Object.assign({}, state, {
        visibilityFilter: action.filter,
      });
    case ADD_TODO:
      return Object.assign({}, state, {
        todos: todos(state.todos, action),
      });
    case TOGGLE_TODO:
      return Object.assign({}, state, {
        todos: todos(state.todos, action),
      });
    default:
      return state;
  }
}
```

优化之后的代码中，对于 `state` 中 `todos` 中使用单独 `todos` 方法来进行管理， 在 toApp 中，只需要将需要更新的数据传递给 `todos` 函数.

### 使用 comBinReducers() 工具函数

对上面的 todoApp 函数进行优化

```js
import { comBinReducers } from "redux";
const todoApp = comBinReducers({
  todos,
});
```

## store

store 具有以下职责：

- 维持应用的 state
- 提供 getState() 方法获取 state
- 通过 subscribe(listener)注册监听器
- 通过 subscribe(listener)返回的函数注销监听器

### 创建 store

```js
import { createStore } from "redux";
import reducer from "./reducer";

const store = createStore(reducer);
```

## 数据流

在 redux 中，数据流是严格单向的。

### redux 应用中数据的生命周期

- 1.调用 `store.dispatch(action)`

action 就是一个描述发生了什么的对象

```js
const action = {
  type: "dosomething",
  value: value,
};
```

- 2. `Redux store` 调用传入的 `reducer` 参数

`store` 会将两个参数传递给 `reducer`,当前的 `state 树`和 `action`.

**注意 reducer 是纯函数。他仅仅用于计算下一个 state，多次传入相同的值必须有相同的输出。不应该作有副作用的操作（API 调用或者路由跳转）**

根 reducer 应当将多个 reducer 输出合并成一个单一的 state 树

使用 combinReducers()

```js
function todos(state = [], action) {
  return newState;
}
function visiableTodoFilter(state = "show_all", action) {
  return newState;
}

function todoApp = combinreducers({
  todos,
  visiableTodoFilter
})
```

当触发 action 后，combinReducer 返回的 todoApp 会负责调用两个 reducer，然后把两个结果集合并成一个 state 树。

### redux sotre 保存了根 reducer 返回的完整的 state 树

这个完整的 state 树就是下一个 state。所有订阅 store.subscribe(listener) 的监听器都会调用，监听器里可以调用 store.getState() 来获取当前的 state
