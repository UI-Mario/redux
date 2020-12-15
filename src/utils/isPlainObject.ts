/**
 * @param obj The object to inspect.
 * @returns True if the argument appears to be a plain object.
 */
// TODO:what is plain object // 花里胡哨，一句话，原型链长度为1
// 只有通过字面量形式var x = {}或是new关键字var x = new Object()，才是plain object
// 而其他方式，类似于Object.create()和new Fruit()啥的，都不是
// 至于啥function、null，连下面函数的第一行代码都过不去
// TODO: Why must plain object??
export default function isPlainObject(obj: any): boolean {
  // js本身的emm，彩蛋
  if (typeof obj !== 'object' || obj === null) return false

  let proto = obj
  // emm，涉及到的东西就是原型链啥的，啥意思呢，
  // 具体请看这张图https://github.com/UI-Mario/UI-Mario.github.io/blob/master/resource/prototype.jpg
  // 反正意思就是，不管啥东西的prototype，__proto__指到最顶端一定是Object.prototype
  // 而Object.prototype.__proto__ === null
  // 这就是传说中的原型链
  // 不过要注意，Object.getPrototypeOf这个方法，索引的是.__proto__，不是.prototype
  // 扯开来讲一下就是，
  // __proto__构成原型链
  // .prototype和.constructor是一对，互指对象原型和对象构造方法（函数）
  // 🌰:
  // const apple = new Fruit()
  // Fruit.prototype ===> Fruit.prototype
  // Fruit.prototype.constuctor ===> Fruit
  while (Object.getPrototypeOf(proto) !== null) {
    proto = Object.getPrototypeOf(proto)
  }
  // 这段代码就保证了，原型链的长度 === 1，就是纯函数啦
  // 而且建议看一下下面两篇文章，有关于此方法的困惑
  // https://www.zhihu.com/question/287632207/answer/458261384
  // https://www.zhihu.com/question/299783862
  return Object.getPrototypeOf(obj) === proto
}

// TODO:这个函数体里的东西换过去也能跑过所有测试
const myIsPlainObject = (obj: any) => {
  let proto = Object.getPrototypeOf(obj)
  return Object.getPrototypeOf(proto) === null
}

// 但是这个过不了，为啥
// 基本上和Array.isArray要解决的问题一样
// context
const failIsPlainObject = (obj: any) => {
  return Object.getPrototypeOf(obj) === Object.prototype;
}

// TODO:context [[prototype]] ??
