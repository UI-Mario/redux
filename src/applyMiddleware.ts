import compose from './compose'
import { Middleware, MiddlewareAPI } from './types/middleware'
import { AnyAction } from './types/actions'
import {
  StoreEnhancer,
  Dispatch,
  PreloadedState,
  StoreEnhancerStoreCreator
} from './types/store'
import { Reducer } from './types/reducers'

/**
 * Creates a store enhancer that applies middleware to the dispatch method
 * of the Redux store. This is handy for a variety of tasks, such as expressing
 * asynchronous actions in a concise manner, or logging every action payload.
 *
 * See `redux-thunk` package as an example of the Redux middleware.
 *
 * Because middleware is potentially asynchronous, this should be the first
 * store enhancer in the composition chain.
 *
 * Note that each middleware will be given the `dispatch` and `getState` functions
 * as named arguments.
 *
 * @param middlewares The middleware chain to be applied.
 * @returns A store enhancer applying the middleware.
 *
 * @template Ext Dispatch signature added by a middleware.
 * @template S The type of the state supported by a middleware.
 */
// FIXME:第一眼就被震住了，不会触发multi——name么ლ(′◉❥◉｀ლ)
// 不好意思是我太辣鸡，ts里有函数重载
// first, what is overload
// 传统重载是同名函数有不同的实现和接口
// second, why need overload
// 为了使类型和个数明朗，避免函数内部和外部的冗余操作，敲代码能有提示
// 但可惜js没有overload这一说
// 具体原因有：
// 1.动态语言，函数参数都放在类数组对象里，不定义参数类型，也不检查参数的类型和个数
// 2.js里函数也是一个对象，所谓的函数签名就是一个指针，不停地换指针只会指向最后一个
// 🌰:
// var a = () => {
//   console.log(1);
// };
// var a = () => {
//   console.log(2);
// };
// var a = (c) => {
//   console.log(3);
// };
// var a = () => {
//   console.log(4);
// };
// a('m'); // 4
// --------------------TS----------------------
// ts支持函数重载，虽然用起来很别扭
// TypeScript 重载的过程是，拿传入的参数和重载的方法签名列表中由上往下逐个匹配，
// 匹配什么东西呢，参数的类型和个数
// 直到找到一个完全匹配的函数签名，否则报错
// 所以推荐的做法是将签名更加具体的重载放上面，不那么具体的放后面
// 最后一个签名要包含前面所有签名的情况，并且它不在重载列表内
// 为什么要这么设计？我反正是不想深究了，还涉及ts的设计原则啥的
// 使用体验就是，如果是根据参数不同有不同返回类型，可以试试；但如果只有参数变，输出结果类型不变，那还是别了
// 🌰:
// 一般的都能跑，可惜typeof很弱鸡，而且redux里面泛型多到爆炸，所以上例就我的出发点而言，基本没啥用
export default function applyMiddleware(): StoreEnhancer
export default function applyMiddleware<Ext1, S>(
  middleware1: Middleware<Ext1, S, any>
): StoreEnhancer<{ dispatch: Ext1 }>
export default function applyMiddleware<Ext1, Ext2, S>(
  middleware1: Middleware<Ext1, S, any>,
  middleware2: Middleware<Ext2, S, any>
): StoreEnhancer<{ dispatch: Ext1 & Ext2 }>
export default function applyMiddleware<Ext1, Ext2, Ext3, S>(
  middleware1: Middleware<Ext1, S, any>,
  middleware2: Middleware<Ext2, S, any>,
  middleware3: Middleware<Ext3, S, any>
): StoreEnhancer<{ dispatch: Ext1 & Ext2 & Ext3 }>
export default function applyMiddleware<Ext1, Ext2, Ext3, Ext4, S>(
  middleware1: Middleware<Ext1, S, any>,
  middleware2: Middleware<Ext2, S, any>,
  middleware3: Middleware<Ext3, S, any>,
  middleware4: Middleware<Ext4, S, any>
): StoreEnhancer<{ dispatch: Ext1 & Ext2 & Ext3 & Ext4 }>
export default function applyMiddleware<Ext1, Ext2, Ext3, Ext4, Ext5, S>(
  middleware1: Middleware<Ext1, S, any>,
  middleware2: Middleware<Ext2, S, any>,
  middleware3: Middleware<Ext3, S, any>,
  middleware4: Middleware<Ext4, S, any>,
  middleware5: Middleware<Ext5, S, any>
): StoreEnhancer<{ dispatch: Ext1 & Ext2 & Ext3 & Ext4 & Ext5 }>
// 建议middleware这块先看看阮一峰老师的讲解，会容易很多
// TODO:为什么要在上边写这么一大堆函数？
export default function applyMiddleware<Ext, S = any>(
  ...middlewares: Middleware<any, S, any>[]
): StoreEnhancer<{ dispatch: Ext }>
export default function applyMiddleware(
  ...middlewares: Middleware[]
): StoreEnhancer<any> {
  return (createStore: StoreEnhancerStoreCreator) => <S, A extends AnyAction>(
    reducer: Reducer<S, A>,
    preloadedState?: PreloadedState<S>
  ) => {
    const store = createStore(reducer, preloadedState)
    // TODO:Why
    let dispatch: Dispatch = () => {
      throw new Error(
        'Dispatching while constructing your middleware is not allowed. ' +
          'Other middleware would not be applied to this dispatch.'
      )
    }

    const middlewareAPI: MiddlewareAPI = {
      getState: store.getState,
      dispatch: (action, ...args) => dispatch(action, ...args)
    }
    const chain = middlewares.map(middleware => middleware(middlewareAPI))
    // 传给compose，让其产生一个链式调用的函数
    dispatch = compose<typeof dispatch>(...chain)(store.dispatch)

    return {
      ...store,
      dispatch
    }
  }
}
