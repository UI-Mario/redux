/**
 * These are private action types reserved by Redux.
 * For any unknown actions, you must return the current state.
 * If the current state is undefined, you must return the initial state.
 * Do not reference these action types directly in your code.
 */
  // TODO:toString(x),x?
  // Number的toString可以接受一个可选参数radix指定进制
  // 敲黑板：js的toString一般是指Object.prototype.toString()，不带参数，
  // 但是Number把它重写了
  // 可带参数radix，范围2-36，指定转换的目标进制，超范围抛出RangeError
  // Number的toString貌似是把待转数字默认十进制，还是会自动识别？不知，看下例

  // console.log((6).toString(2));       // 输出 '110'，6的2进制110
  // console.log((254).toString(16));  // 输出 'fe'，254的16进制fe
  // console.log((-10).toString(2));   // 输出 '-1010'，带正负号这个转后面的数字，前面的正负号转完后带过去
  // console.log((-0xff).toString(2)); // 输出 '-11111111'，0xff是什么意思呢，0x表明这是个16进制，所以真正转的是ff

  // 所以，上面例子来自MDN，感觉有点钻空子呀，就来一个16进制，试了试其他的，都是认作十进制

const randomString = () =>
  Math.random().toString(36).substring(7).split('').join('.')

  // 声明了两个action，type分别是INIT和REPLACE
  // 内部使用，不对外暴露
  // INIT在createStore时使用，通过这个触发dispatch，收集每个reducer的initState进行总的state初始化
  // REPLACE在store通过reducer更新state的时候使用
const ActionTypes = {
  INIT: `@@redux/INIT${/* #__PURE__ */ randomString()}`,
  REPLACE: `@@redux/REPLACE${/* #__PURE__ */ randomString()}`,
  // TODO:这又是哪块小饼干，来一个随便的actionType，估计是测试reducer
  PROBE_UNKNOWN_ACTION: () => `@@redux/PROBE_UNKNOWN_ACTION${randomString()}`
}

export default ActionTypes
