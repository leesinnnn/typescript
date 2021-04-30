function restArguments(func: (...args:any[]) => void, startIndex?: number) {
  startIndex = startIndex == null ? func.length - 1 : +startIndex;
  return function() {
    var length = Math.max(arguments.length - (<number>startIndex), 0),
        rest = Array(length),
        index = 0;
    for (; index < length; index++) {
      rest[index] = arguments[index + (<number>startIndex)];
    }
    switch (startIndex) {
      case 0: return func.call(this, rest);
      case 1: return func.call(this, arguments[0], rest);
      case 2: return func.call(this, arguments[0], arguments[1], rest);
    }
    var args = Array((<number>startIndex) + 1);
    for (index = 0; index < (<number>startIndex); index++) {
      args[index] = arguments[index];
    }
    args[(<number>startIndex)] = rest;
    return func.apply(this, args);
  };
}

const sum = (a:number ,b:number, c:number) => {
  return a + b + c
}

const wrappedSum = restArguments(sum)
wrappedSum(1,2,3)