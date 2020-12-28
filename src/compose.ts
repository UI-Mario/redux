type Func<T extends any[], R> = (...a: T) => R

// ts允许函数重载

/**
 * Composes single-argument functions from right to left. The rightmost
 * function can take multiple arguments as it provides the signature for the
 * resulting composite function.
 *
 * @param funcs The functions to compose.
 * @returns A function obtained by composing the argument functions from right
 *   to left. For example, `compose(f, g, h)` is identical to doing
 *   `(...args) => f(g(h(...args)))`.
 */
export default function compose(): <R>(a: R) => R

export default function compose<F extends Function>(f: F): F

/* two functions */
export default function compose<A, T extends any[], R>(
  f1: (a: A) => R,
  f2: Func<T, A>
): Func<T, R>

/* three functions */
export default function compose<A, B, T extends any[], R>(
  f1: (b: B) => R,
  f2: (a: A) => B,
  f3: Func<T, A>
): Func<T, R>

/* four functions */
export default function compose<A, B, C, T extends any[], R>(
  f1: (c: C) => R,
  f2: (b: B) => C,
  f3: (a: A) => B,
  f4: Func<T, A>
): Func<T, R>

/* rest */
export default function compose<R>(
  f1: (a: any) => R,
  ...funcs: Function[]
): (...args: any[]) => R

export default function compose<R>(...funcs: Function[]): (...args: any[]) => R

export default function compose(...funcs: Function[]) {
  if (funcs.length === 0) {
    // infer the argument type so it is usable in inference down the line
    return <T>(arg: T) => arg
  }

  if (funcs.length === 1) {
    return funcs[0]
  }

  // 返回一个函数，相当于所有函数的顺序回调，具体可以自己试着敲一下
  // 比较让我好奇的是，accumulator没有初始值又是一个函数，这里面的逻辑到底是什么，默认给他分配了啥
  return funcs.reduce((a, b) => (...args: any) => a(b(...args)))
}

const myCompose = (...fns: any[]): ((...args: any) => number) => {
  console.log(fns)
  // console.log(args)
  // 比较难的点就是acFn的初始值
  // 以及args
  // args例子如下：
  // const test = () => {
  //   return (...args) => args
  // }
  // console.log(test()(1, 2, 3))
  // 神奇

  // 把reduce的手写提上日程
  // 写完了

  return fns.reduce((acFn, curFn) => (...args: any) => {
    console.log(args)
    console.log('this is acFn', acFn)
    acFn(curFn(...args))
  })
}

const test_1 = (a: number) => {
  console.log(a + 1)
  return a + 1
}

const test_2 = (a: number) => {
  console.log(a + 2)
  return a + 2
}

const test_3 = (a: number) => {
  console.log(a + 3)
  return a + 3
}

const test_4 = (a: number) => {
  console.log(a + 4)
  return a + 4
}

const resFn = myCompose(test_1, test_2, test_3, test_4)

console.log(resFn(1))
