// 实现一个函数通过key值的传入对象的value keyof返回的是联合类型

function getValueByKey1<T extends object>(obj: T, key: keyof T): T[keyof T] {
  return obj[key]
}

function getValueByKey2<T extends object, K extends keyof T>(obj: T, key: K) {
  return obj[key]
}

const testObj = {
  a: 1,
  b: 1,
}
getValueByKey1(testObj, 'a')
getValueByKey2(testObj, 'b')

interface Iceshi {
  a: never,
  b: number,
  c: string,
  d: undefined,
  e: null
}
type xxx = Iceshi[keyof Iceshi] // 这样的话可以获得不为never类型的








// in主要用于取联合类型的值  interface里面有in会报错

type union = 'a' | 'b'
type Tunios = {
  [key in union]: string
}






// 取出一个函数类型的参数类型

type funcType = (param1: number, param2: number) => void

type MyParameters<T extends (...args: any[]) => any> = T extends (
  ...args: infer P
) => any
  ? P
  : any;

// 函数的返回值类型
type MyReturnType<T extends (...args: any[]) => any> = T extends (
  ...args: any
) => infer P
  ? P
  : any;

// 类的实例类型
type instance<T extends new (...args: any) => any> =
  T extends new (...args: any) => infer P ?
  P :
  any