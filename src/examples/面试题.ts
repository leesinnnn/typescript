// 假设有一个这样的类型：
interface IinitInterface {
  count: number;
  message: string;
  asyncMethod<T, U>(input: Promise<T>): Promise<Action<U>>;
  syncMethod<T, U>(action: Action<T>): Action<U>;
}
// 在经过 Connect 函数之后，返回值类型为

type Result = {
  asyncMethod<T, U>(input: T): Action<U>;
  syncMethod<T, U>(action: T): Action<U>;
}
// 其中 Action<T> 的定义为：
interface Action<T> {
  payload?: T
  type: string
}
// 现在要求写出Connect的函数类型定义。


// 解
type getFunctionStr<T extends object> = {
  [key in keyof T]: T[key] extends (...arg: any) => any ? key : never
}[keyof T]

type getFunction<T extends object> = Pick<T, getFunctionStr<T>>

type liqing = getFunction<IinitInterface>['asyncMethod']

type transform<T> =
  T extends <K, U>(input: Promise<K>) => Promise<Action<U>> ?
  <R, H>(input: R) => Action<H> : never
type dasdasda = transform<liqing>

interface IinitInterface2 {
  asyncMethod<T, U>(input: Promise<T>): Promise<Action<U>>;
  syncMethod<T, U>(action: Action<T>): Action<U>;
}

type transformFuncType<T> = {
  [key in keyof T]: T[key] extends ((input: Promise<infer K>) => Promise<Action<infer U>>) ?
  <K, U>(input: K) => Action<U>
  : T[key] extends <U>(action: Action<infer K>) => Action<U> ?
  <K, U>(action: K) => Action<U> :
  never
}
type lll = transformFuncType<IinitInterface2>



// 将接口的属性全部变成可选属性
type MyPartial<T extends object> = {
  [key in keyof T]?: T[key]
}

// 将接口的属性全部变成必须属性
type MyRequired<T extends object> = {
  [key in keyof T]-?: T[key]
}

// 将接口的属性全部变成只读属性
type MyReadOnly<T extends object> = {
  readonly [key in keyof T]: T[key]
}

// 将接口中的一些属性摘取出来
type MyPick<T, K extends keyof T> = {
  [key in K]: T[K]
}

// 记录类型
type MyRecord<T extends any, K> = {
  [key in T]: K
}

// 剔除接口的某个属性类型
type MyOmit<T extends object, K extends keyof T> = Pick<T, Exclude<keyof T, K>>