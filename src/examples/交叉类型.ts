// interface props1 {
//   name: string,
//   age: number
// }

// interface props2 {
//   sex: string
// }

// let a: props1 & props2 = {
//   name: 'liqing',
//   age: 18,
//   sex: 'man'
// }




// // 交叉类型发生冲突就会变成never类型
// interface one {
//   size: number
// }

// interface two {
//   size: string
// }
// function returnNeverFunc(): never {
//   while(true) {
//   }
// }
// let b: one & two = {
//   size: returnNeverFunc()
// }



// // 产生never类型的一个方法
// type iProps = 'a' | 'b'

// function devidedIProps(params: iProps) {
//   switch(params) {
//     case 'a':
//       return params
//     case 'b':
//       return params
//     default:
//       const result: never = params
//       return result
//   }
// }