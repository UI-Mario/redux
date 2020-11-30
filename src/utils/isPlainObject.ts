/**
 * @param obj The object to inspect.
 * @returns True if the argument appears to be a plain object.
 */
// TODO:what is plain object
// 只有通过字面量形式var x = {}或是new关键字var x = new Object()，才是plain object
// 而其他方式，类似于Object.create()和new Fruit()啥的，都不是
// 至于啥function，连下面函数的第一行代码都过不去
// TODO: Why must plain object??
export default function isPlainObject(obj: any): boolean {
  if (typeof obj !== 'object' || obj === null) return false

  let proto = obj
  while (Object.getPrototypeOf(proto) !== null) {
    proto = Object.getPrototypeOf(proto)
  }

  return Object.getPrototypeOf(obj) === proto
}
