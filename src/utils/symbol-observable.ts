declare global {
  // ts的global variable的声明方式
  // TODO:这究竟是在什么时候起的作用？编译后？
  interface SymbolConstructor {
    readonly observable: symbol
  }
}

// TODO:
// 1.为什么要以函数形式写
// 函数体内的表达式更是看得我很迷惑
// 大概是：支持Symbol？挂上去了？最后那个又是啥？？？？
// 2.why
const $$observable = /* #__PURE__ */ (() =>
  (typeof Symbol === 'function' && Symbol.observable) || '@@observable')()

export default $$observable

