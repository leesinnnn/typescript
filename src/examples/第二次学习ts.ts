// 只有数字的数组的两种声明方式
let arr1: number[]
let arr2: Array<number>

// 枚举是双向都可以获取的
enum enum1 {
  user,
  admin
}
enum1.user
enum1.admin
enum1['user']
enum1['admin']
enum1[0]
enum1[1]

// 枚举的某个成员如果使用的是计算值，那么下一个成员必须指定值
const getValue = () => 1
enum enum2 {
  user,
  admin = getValue(),
  people = 2
}

// 枚举成员和枚举也可以作为一种类型来使用 (这里也有枚举数字成员的兼容性)
enum enum3 {
  admin = 'lee',
  user = 1
}
interface interface5 {
  string: enum3.admin
  name: enum3,
  age: enum3.user
}

const ceshi1: interface5 = {
  string: enum3.admin,
  name: 5,
  age: 18
}

// never类型是任何类型的子类型，可以将never类型的变量赋值给任何其他类型的变量, undefined类型是void类型的子类型

// 强制类型转换有两种形式，react中只能用第二种
function getLength(n: number | string): number {
  if ((<string>n).length || (n as string).length === 0) {
    return (n as string).length
  } else {
    return n.toString().length
  }
}

// 索引签名，可以让对象支持多余属性
interface interface1 {
  name: string,
  age: number,
  [props: string]: string | number  // 如果这里是number就会报错
}

const obj1: interface1 = {
  name: 'leesin',
  age: 18,
  sex: '男'
}

// 混合接口类型
interface interface2 {
  (): number,
  count: number
}

const getCounter = () => {
  const counter: interface2 = () => {
    return counter.count++
  }
  counter.count = 0
  return counter
}

// 函数重载
function handleData(data: number): number[]
function handleData(data: string): string[]
function handleData(data: any): any {
  if (typeof data === 'number') {
    const arr = []
    arr.push(data)
    return arr
  } else {
    return data.split(',')
  }
}

// 泛型函数
const func1 = <T>(value: T): T[] => {
  return [value]
}
interface interface3 {
  <T>(value: T): T[]
}
const func2: interface3 = (value) => {
  return [value]
}

const result = func1('1')
const result2 = func2(1)

// 泛型接口
interface interface4<T> {
  (value: T): T[]
}

const func3: interface4<string> = (value) => {
  return [value]
}

// 泛型约束
// 只接受有length属性的参数
const func4 = <T extends { length: number }>(value: T) => {
  return value.length
}

const func5 = <T, K extends keyof T>(obj: T, key: K): T[K] => {
  return obj[key]
}

// 类型推断
// ts会自动推断ceshi2的类型为(string | number)[],再给它赋值其他类型会报错(根据等号右边来推断)
const ceshi2 = ['a', 1]
// 根据等号左边来推断event参数的类型
window.onmousedown = (event: MouseEvent) => {
  event.clientX
}

// 类型兼容性
interface interface6 {
  name: string
}
const test = {
  name: 'lee',
  sex: 'nan'
}

const ceshi3: interface6 = test

// 函数参数个数兼容性 这里也有函数返回值的兼容性
type func1 = (arg1: number, arg2: number) => void


const funcTest: func1 = (arg1: number) => {
  return arg1
}

// 函数可选参数兼容性 这里也有函数返回值的兼容性
type func2 = (arg1: number, ...arg2: string[]) => void

const funcTest2: func2 = (arg1: number, arg2: string): string => {
  return arg2 + arg1
}

// 函数参数双向协变,这个不知道为什么有一边会报错
type func3 = (arg1: number) => void

const funTest3: func3 = (arg1: number | string) => {

}

type func4 = (arg1: number | string) => void

const funcTest4: func4 = (arg1: number) => { }

// 函数返回值的兼容性
type func5 = () => string | number
const funcTest5: func5 = (): string => { return '1' }

// 函数重载的兼容性
function funcTest6(arg: number): number
function funcTest6(arg: string): string
function funcTest6(arg: any): any {
  return arg
}

function funcTest8(arg: number): number
function funcTest8(arg: any): any {
  return arg
}
let funcTest7 = funcTest8
funcTest7 = funcTest6

// typeof类型保护 必须满足的一个条件
//  1、只能用typeof varibles === 或者 !== 的形式来判断才会有类型保护，其他的就没有，如下就没有类型保护
const funcTest9 = (value: number | string) => {
  if ((typeof value).includes("string")) {
    return value.length
  } else {
    return value.toString().length
  }
}
// 2、等号右边只能是string，number，boolean，symbol中的一种，其他的也没有类型保护，如下就没有类型保护 这个好像又有类型保护了，可能版本更新了 = =
const funcTest10 = (value: undefined | (() => void)) => {
  if (typeof value === 'undefined') {
    return value
  } else {
    return value()
  }
}

// 这种情况没有类型保护也是可以的，你说神奇不神奇= =
const funcTest13 = (value: string | null) => {
  return (value || '').length
}

// 用户自定义类型保护
const funcTest11 = (value: number | string): value is number => {
  return false
}

const funcTest12 = (value: string | number) => {
  if (funcTest11(value)) {
    return value.toFixed()
  } else {
    return value.includes('1')
  }
}

// 去除null和undefined，后面加一个!
function broken(name: string | null): string {
  function postfix(epithet: string) {
    return name.charAt(0) + '.  the ' + epithet; // error, 'name' is possibly null
  }
  name = name || "Bob";
  return postfix("great");
}

function fixed(name: string | null): string {
  function postfix(epithet: string) {
    return name!.charAt(0) + '.  the ' + epithet; // ok
  }
  name = name || "Bob";
  return postfix("great");
}

// 类型别名
// 类型别名不能被 extends和 implements（自己也不能 extends和 implements其它类型）。
// 因为 软件中的对象应该对于扩展是开放的，但是对于修改是封闭的，你应该尽量去使用接口代替类型别名。
// 另一方面，如果你无法通过接口来描述一个类型并且需要使用联合类型或元组类型，这时通常会使用类型别名。
type typeTest<T> = {
  age: T,
  number: T
}

// 字符串字面量类型，数字字面量类型
type typeTest2 = 'nan' | 'nv'
type typeTest3 = 1 | 2
const testVaribles: typeTest2 = 'nan'
const testVaribles2: typeTest3 = 2

// 可辨识联合类型 两要素 1、具有普通的单例类型属性 2、一个类型别名包含了一些类型的联合
interface ISquare {
  kind: 'square',
  size: number
}
interface IRectangle {
  kind: 'rectriangle',
  height: number,
  width: number
}
interface ICircle {
  kind: 'circle',
  radius: number
}
type Area = ISquare | IRectangle | ICircle

const getArea = (area: Area) => {
  switch (area.kind) {
    case 'square':
      return area.size * area.size
    case 'rectriangle':
      return area.height * area.width
    default:
      return Math.PI * area.radius ** 2
  }
}

// 映射类型只能用type，interface不行

type readOnlyType<T> = {
  readonly [P in keyof T]: T[P]
}
// 这个用interface的就不行
interface readOnlyType2<T> {
  readonly [P in keyof T]: T[P]
}

// 移除特定的修饰符
interface interface7 {
  readonly name?: string
  readonly age?: number
}

type remove<T> = {
  - readonly [P in keyof T]-?: T[P]
}

type testObj = remove<interface7>

// 记住一点很重要，先想你要干什么，再想类型应该怎么设置，实在不行有any呀= =

// 对应ts文档的封包和拆包，这里只写了封包
type proxy<T> = {
  [P in keyof T]: {
    get(): T[P],
    set(value: T[P]): void
  }
}
function changeProperty2Obj<T extends object>(obj: T): proxy<T> {
  const result = {} as proxy<T>
  for (const key in obj) {
    result[key] = {
      get() {
        return obj[key]
      },
      set(value) {
        obj[key] = value
      }
    }
  }
  return result
}

// 元组类型的映射类型也是一个元组类型
type mapToPromise<T> = {
  [P in keyof T]: Promise<T[P]>
}

type tuple = [string, number, boolean]

type tupleProxy = mapToPromise<tuple>

// 关于unkonwn的十点自己去看视频，太多了= =

// 分布式条件类型
// 1.分布式的联合类型只看extends的左边那一个，其他的联合类型不会进行分布式
// 2.如果是never类型就不会返回(这个仅限于只有条件类型的时候)
type Diff<T, U> = T extends U ? never : T
type typeTest4 = Diff<string | number | object, string | number | boolean>

// 剔除never类型的方法

interface interface8 {
  a: never,
  b: number,
  c: string,
  d: undefined,
  e: null
}

type removeNever = interface8[keyof interface8]

// 剔除某个类型的思路先将该类型变为never类型然后再将never类型剔除
// 如下，剔除不是函数类型的类型
interface interface9 {
  a: string,
  b: number,
  c: boolean,
  d: (value: string) => void
}

type keepFunction<T> = {
  [K in keyof T]: T[K] extends Function ? T[K] : never
}[keyof T]

type keepFunctionTest = keepFunction<interface9>

// 条件类型的infer的使用
// 传入一个类型，如这个类型是数组就返回数组的元素类型，如果不是数组就直接返回该类型
// 不用infer的写法
type getElementType<T> = T extends Array<any> ? T[number] : T
// 只用infer的写法
type getElementType2<T> = T extends Array<infer U> ? U : T
