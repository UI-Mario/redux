/**
 * These are private action types reserved by Redux.
 * For any unknown actions, you must return the current state.
 * If the current state is undefined, you must return the initial state.
 * Do not reference these action types directly in your code.
 */

const randomString = () =>
  Math.random().toString(36).substring(7).split('').join('.')

  // TODO:toString(x),x?
  // 声明了两个action，type分别是INIT和REPLACE
  // 内部使用，不对外暴露
  // INIT在createStore时使用
  // REPLACE在store通过reducer更新state的时候使用
const ActionTypes = {
  INIT: `@@redux/INIT${/* #__PURE__ */ randomString()}`,
  REPLACE: `@@redux/REPLACE${/* #__PURE__ */ randomString()}`,
  PROBE_UNKNOWN_ACTION: () => `@@redux/PROBE_UNKNOWN_ACTION${randomString()}`
}

export default ActionTypes
