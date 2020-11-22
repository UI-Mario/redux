// 利用reducer计算state
const createStore = (reducer, initState) => {
  let currentstate = initState;
  let listeners = [];
  let currentReducer = reducer;
  let isDispatching = false;

  const subscribe = (listener) => {
    // type check
    if (typeof listener !== "function") {
      throw new Error("Expected the listener to be a function.");
    }

    if (isDispatching) {
      throw new Error("dispatching");
    }

    // oh，这玩意是不是就是传说中的闭包
    let isSubscribed = true;

    if (listener) listeners.push(listener);

    return () => {
      if (!isSubscribed) {
        return;
      }

      if (isDispatching) {
        throw new Error("");
      }

      isSubscribed = false;

      const index = listeners.indexOf(listener);
      listeners.splice(index, 1);
    };
  };

  //   function changeState(newState) {
  //     isDispatching = true;
  //     currentstate = reducer(newState, action);
  //     isDispatching = false;

  //     /*通知*/
  //     for (let i = 0; i < listeners.length; i++) {
  //       const listener = listeners[i];
  //       listener();
  //     }
  //   }

  const dispatch = (action) => {
    // type check
    // if (isPlainObject(action)) {
    // }
    if (typeof action.type === "undefined") {
    }
    if (isDispatching) {
    }

    // 更新reducer
    // 更新state
    // 通知listeners
    try {
      isDispatching = true;
      currentstate = currentReducer(currentstate, action);
    } finally {
      isDispatching = false;
    }

    for (var listener of listeners) {
      listener();
    }
  };

  const observe = () => {};

  const getState = () => {
    // progress check
    if (isDispatching) {
      throw new Error("dispatching");
    }
    return currentstate;
  };

  const store = {
    subscribe,
    dispatch,
    getState,
    // replaceReducer,
  };
  return store;
};

const counterReducer = (state, action) => {
  switch (action.type) {
    case "INCRESEMENT":
      return {
        // 同名属性自动覆盖
        ...state,
        count: state.count + 1,
      };
    case "DECRESEMENT":
      return {
        ...state,
        count: state.count - 1,
      };
    default:
      return state;
  }
};

const infoReducer = (state, action) => {
  switch (action.type) {
    case "CHANGE_NAME":
      return {
        ...state,
        name: action.payload,
      };
    case "CHNAGE_AGE":
      return {
        ...state,
        age: action.payload,
      };
    default:
      return state;
  }
};

const combineReducers = (reducers) => {
  const reducerKeys = Object.keys(reducers);
  return (state = {}, action) => {
    // 全新总的state
    // 不过这样的话，每次dispatch都重新算所有state，感觉也low了
    const nextState = {};
    for (var i = 0; i < reducerKeys.length; i++) {
      const key = reducerKeys[i];
      const prevState = state[key];
      const reducer = reducers[key];

      const nextStateForKey = reducer(prevState, action);
      nextState[key] = nextStateForKey;
    }
    return nextState;
  };
};

// =========================use================================
let initState = {
  count: {
    count: 0,
  },
  info: {
    name: "Bob",
    age: 18,
  },
};

const reducer = combineReducers({
  count: counterReducer,
  info: infoReducer,
});

let store = createStore(reducer, initState);

const unsubscribe = store.subscribe(() => {
  let state = store.getState();
  console.log(state);
});
/*自增*/
store.dispatch({
  type: "CHANGE_NAME",
  payload: "Smith",
});
/*自减*/
store.dispatch({
  type: "DECRESEMENT",
});
/*我想随便改 计划外的修改是无效的！*/
// store.changeState({
//   count: "abc",
// });
// store.changeState({
//   ...store.getState(),
//   counter: {
//     count: 1,
//   },
// });
